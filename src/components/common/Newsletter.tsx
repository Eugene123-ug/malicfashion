import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="bg-primary text-background py-20 sm:py-24">
      <div className="max-w-[720px] mx-auto px-6 text-center">
        <p className="text-[11px] uppercase tracking-[0.35em] text-secondary mb-4">
          Newsletter
        </p>
        <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl mb-5 leading-tight">
          Get First Access.
        </h2>
        <p className="text-background/70 text-sm sm:text-base max-w-md mx-auto mb-10 leading-relaxed">
          New drops, exclusive offers, and stories from the studio.
        </p>

        {submitted ? (
          <p className="text-secondary uppercase tracking-widest text-sm">
            Thank you. You are on the list.
          </p>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-0 max-w-[520px] mx-auto border border-background/30"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="flex-1 bg-transparent text-background placeholder-background/40 px-5 py-4 text-sm focus:outline-none border-b sm:border-b-0 sm:border-r border-background/30"
            />
            <button
              type="submit"
              className="bg-secondary text-primary text-xs uppercase tracking-widest px-8 py-4 hover:bg-background transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-background/40 text-[11px] mt-4">
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}