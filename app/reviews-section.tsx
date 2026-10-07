import Image from "next/image";
import { CONTACT } from "./brand";
import { getGoogleReviews, type Review } from "./reviews";
import { Button, Eyebrow, reveal } from "./ui";

const COLUMNS = 3;
const PER_COLUMN = 4;

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function ReviewCard({ review, isRepeat }: { review: Review; isRepeat: boolean }) {
  return (
    <figure className="card tm-card" aria-hidden={isRepeat}>
      {/* Google policy: author name and photo link to the author profile. */}
      <a href={review.profile} target="_blank" rel="noopener noreferrer" tabIndex={-1} aria-hidden>
        {review.photo ? (
          <Image src={review.photo} alt="" width={60} height={60} />
        ) : (
          <span className="tm-avatar">{initials(review.author)}</span>
        )}
      </a>
      <blockquote>{review.text}</blockquote>
      <hr />
      <figcaption>
        <a className="tm-name" href={review.profile} target="_blank" rel="noopener noreferrer">
          {review.author}
        </a>
        <span>
          <span role="img" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.round(review.rating))}</span>
          {review.when && ` · ${review.when}`}
        </span>
      </figcaption>
    </figure>
  );
}

// Real Google reviews in the locked testimonial wall. The wall needs 12 cards for its parallax and marquee,
// so the (at most 5) reviews repeat; repeats are hidden from screen readers.
export async function ReviewsSection() {
  const summary = await getGoogleReviews();
  const reviews = summary?.reviews ?? [];
  const url = summary?.url ?? CONTACT.maps;

  return (
    <section className="section">
      <div className="wrap">
        <div className="head head-center" {...reveal("slide", 0.3)}>
          <Eyebrow>Google Reviews</Eyebrow>
          <h2>What Kelowna Drivers Say</h2>
          <p>
            {summary
              ? `Rated ${summary.rating.toFixed(1)} from ${summary.count} reviews on Google.`
              : "Rated 5.0 by Okanagan drivers on Google."}
          </p>
        </div>
        {summary && reviews.length > 0 && (
          <div className="tm" {...reveal("fade", 0.4)}>
            {Array.from({ length: COLUMNS }, (_, col) => (
              <div key={col} className="tm-col">
                {Array.from({ length: PER_COLUMN }, (_, row) => {
                  const index = col * PER_COLUMN + row;
                  return (
                    <ReviewCard
                      key={row}
                      review={reviews[index % reviews.length]}
                      isRepeat={index >= reviews.length}
                    />
                  );
                })}
              </div>
            ))}
            <div className="tm-fade start" />
            <div className="tm-fade end" />
          </div>
        )}
        {summary && <p className="tm-attribution">Reviews from Google</p>}
        <div className="section-btn center" {...reveal("slide", 0.5)}>
          <Button href={url}>{summary ? `Read All ${summary.count} Reviews` : "Read Our Google Reviews"}</Button>
        </div>
      </div>
    </section>
  );
}
