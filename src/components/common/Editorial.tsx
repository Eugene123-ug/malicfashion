import { Link } from 'react-router-dom';

export default function Editorial() {
  return (
    <section className="bg-primary text-background py-24">
      <div className="max-w-[1280px] mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="/images/editorial-shopping.jpg"
            alt="Editorial fashion"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:pl-6">
          <p className="text-xs uppercase tracking-[0.3em] text-secondary mb-4">
            The Edit
          </p>
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl leading-[1.05] mb-6">
            Dress Different.
            <br />
            Feel Different.
          </h2>
          <p className="text-background/70 max-w-md mb-10">
            Our new editorial collection blends classic tailoring with modern
            attitude. Designed to stand apart.
          </p>
          <Link
            to="/collections"
            className="inline-block bg-secondary text-primary text-xs uppercase tracking-widest px-8 py-4 hover:bg-background transition-colors"
          >
            Explore The Collection
          </Link>
        </div>
      </div>
    </section>
  );
}