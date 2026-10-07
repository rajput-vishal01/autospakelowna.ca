"use client";

import Image from "next/image";
import { useActionState } from "react";
import { checkIcon } from "../content";
import { type ContactState, sendContact } from "./actions";

const initial: ContactState = { status: "idle" };

export function ContactForm() {
  const [state, action, isPending] = useActionState(sendContact, initial);

  if (state.status === "success") {
    return (
      <div className="form-success" role="status">
        <div>
          <Image src={checkIcon} alt="" width={40} height={40} />
          Thank you! Your submission has been received!
        </div>
      </div>
    );
  }

  return (
    <form action={action}>
      <div className="contact-fields">
        <input className="field" name="firstName" placeholder="Your First Name" aria-label="First name" autoComplete="given-name" required maxLength={256} />
        <input className="field" name="lastName" placeholder="Your Last Name" aria-label="Last name" autoComplete="family-name" required maxLength={256} />
        <input className="field" name="email" type="email" placeholder="Your Email Address" aria-label="Email address" autoComplete="email" required maxLength={256} />
        <input className="field" name="phone" type="tel" placeholder="Your Phone Number" aria-label="Phone number" autoComplete="tel" required maxLength={256} />
        <textarea className="field" name="message" placeholder="Write Your Message Here..." aria-label="Message" required maxLength={5000} />
      </div>
      <button type="submit" className="form-button" disabled={isPending}>
        {isPending ? "Please wait..." : "Send Message"}
      </button>
      {state.status === "error" && (
        <p className="form-error" role="alert">
          Oops! Something went wrong while submitting the form.
        </p>
      )}
    </form>
  );
}
