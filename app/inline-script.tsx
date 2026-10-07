"use client";

// Next guide "Preventing flash before hydration": executable in the server HTML, inert (text/plain) when React
// renders it on the client, so React does not warn about script tags. suppressHydrationWarning covers the type swap.
export function InlineScript({ html }: { html: string }) {
  return (
    <script
      type={typeof window === "undefined" ? "text/javascript" : "text/plain"}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
