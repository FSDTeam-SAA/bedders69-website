import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms and Conditions | Care Industry",
  description: "Terms and conditions for using the Care Industry platform.",
};

const sections = [
  {
    title: "1. Acceptance of these terms",
    content:
      "By accessing or using Care Industry, you agree to these Terms and Conditions. If you do not agree, please do not use the platform.",
  },
  {
    title: "2. Using the platform",
    content:
      "You must provide accurate information, keep your account credentials secure, and use the platform lawfully and respectfully. You are responsible for activity carried out through your account.",
  },
  {
    title: "3. Care services and listings",
    content:
      "Care Industry provides a platform for finding care services, jobs, recruitment support, and related information. Providers and users remain responsible for the accuracy of their listings, communications, and arrangements.",
  },
  {
    title: "4. Changes to the service",
    content:
      "We may update, suspend, or change parts of the platform when necessary. We may also update these terms from time to time; continued use after an update means you accept the revised terms.",
  },
  {
    title: "5. Contact us",
    content:
      "If you have questions about these Terms and Conditions, please contact the Care Industry support team.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <section className="bg-slate-50 py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-200 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-700">
            Care Industry
          </p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms and Conditions
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600">
            Please read these terms carefully before creating an account or using our platform.
          </p>

          <div className="mt-10 space-y-8">
            {sections.map((section) => (
              <article key={section.title}>
                <h2 className="text-xl font-semibold text-slate-900">{section.title}</h2>
                <p className="mt-2 leading-7 text-slate-600">{section.content}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
