import type { Metadata } from "next";
import { Effects } from "./effects";
import { InternalNav } from "./site";
import { Button, Eyebrow } from "./ui";

export const metadata: Metadata = { title: "Page Not Found" };

// Mounts Effects too, otherwise the layout footer stays at its pre-reveal opacity.
export default function NotFound() {
  return (
    <>
      <InternalNav />
      <main className="section">
        <div className="wrap">
          <div className="head head-center">
            <Eyebrow>404</Eyebrow>
            <h1>This Page Took a Wrong Turn</h1>
            <p>The page you are looking for has moved or never existed.</p>
            <Button href="/">Back to Home</Button>
          </div>
        </div>
      </main>
      <Effects />
    </>
  );
}
