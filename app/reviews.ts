import { cacheLife } from "next/cache";
import { CONTACT } from "./brand";

export type Review = { author: string; photo?: string; profile?: string; rating: number; text: string; when: string };
export type ReviewSummary = { rating: number; count: number; url: string; reviews: Review[] };

type PlaceResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

/**
 * Live Google rating, review count and latest reviews from the Places API (New).
 * Needs GOOGLE_PLACES_API_KEY and GOOGLE_PLACE_ID; returns null when unset or on failure so the
 * page falls back to a plain "read our reviews on Google" link.
 * ponytail: Places API returns at most 5 reviews. Showing all of them needs the Google Business
 * Profile API (owner OAuth) or a paid widget.
 */
export async function getGoogleReviews(): Promise<ReviewSummary | null> {
  "use cache";
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) {
    cacheLife("hours");
    return null;
  }

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    if (!res.ok) throw new Error(`Places API ${res.status}: ${await res.text()}`);
    const place = (await res.json()) as PlaceResponse;

    cacheLife("days");
    return {
      rating: place.rating ?? 5,
      count: place.userRatingCount ?? 0,
      url: place.googleMapsUri ?? CONTACT.maps,
      reviews: (place.reviews ?? [])
        .filter((r) => r.text?.text && r.authorAttribution?.displayName)
        .map((r) => ({
          author: r.authorAttribution!.displayName!,
          // Places returns protocol-relative avatar URLs ("//lh3.googleusercontent.com/...").
          photo: r.authorAttribution?.photoUri?.replace(/^\/\//, "https://"),
          profile: r.authorAttribution?.uri,
          rating: r.rating ?? 5,
          text: r.text!.text!,
          when: r.relativePublishTimeDescription ?? "",
        })),
    };
  } catch (error) {
    console.error("Google reviews unavailable:", error);
    cacheLife("minutes");
    return null;
  }
}
