import { Link } from 'react-router-dom';

export default function MadeForGhana() {
  return (
    <section className="relative">
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1523824921871-d6f1a15151f1?w=1920"
          alt="Made for Ghana"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative h-full max-w-[1280px] mx-auto px-6 flex flex-col justify-center items-start">
          <p className="text-secondary text-xs uppercase tracking-[0.3em] mb-4">
            Proudly African
          </p>
          <h2 className="font-heading text-background text-5xl md:text-6xl lg:text-7xl leading-[1.05] max-w-3xl mb-6">
            Made for Ghana.
            <br />
            Designed for Everywhere.
          </h2>
          <p className="text-background/80 max-w-xl mb-10">
            Contemporary African fashion with global sensibility. Rooted in
            Accra, worn everywhere.
          </p>
          <Link
            to="/collections"
            className="inline-block bg-secondary text-primary text-xs uppercase tracking-widest px-8 py-4 hover:bg-background transition-colors"
          >
            Shop African Collection
          </Link>
        </div>
      </div>
    </section>
  );
}
