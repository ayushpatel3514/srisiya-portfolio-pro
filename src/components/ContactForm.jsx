import React from "react";
import { useForm, ValidationError } from "@formspree/react";

const ContactForm = () => {
  const [state, handleSubmit] = useForm("mqawkkod"); // 👈 your real ID

  if (state.succeeded) {
    return (
      <p className="mt-4 text-sm text-green-400">
        Thanks for reaching out! I’ll get back to you shortly.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
      <input
        name="name"
        required
        placeholder="Your name"
        className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm"
      />

      <div>
        <input
          name="email"
          type="email"
          required
          placeholder="Email"
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm w-full"
        />
        <ValidationError
          prefix="Email"
          field="email"
          errors={state.errors}
          className="mt-1 text-xs text-red-400"
        />
      </div>

      <div>
        <textarea
          name="message"
          rows={5}
          required
          placeholder="Tell us about the project (sizes, deadline, goal)"
          className="bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-sm w-full"
        />
        <ValidationError
          prefix="Message"
          field="message"
          errors={state.errors}
          className="mt-1 text-xs text-red-400"
        />
      </div>

      <button
        type="submit"
        disabled={state.submitting}
        className="rounded-xl bg-white text-black px-4 py-2 text-sm font-medium
                   hover:bg-orange-500 hover:text-white transition
                   disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {state.submitting ? "Sending..." : "Start your brief — 2 minutes"}
      </button>
    </form>
  );
};

export default ContactForm;
