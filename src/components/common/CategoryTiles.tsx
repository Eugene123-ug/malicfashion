import { Link } from 'react-router-dom';

const categories = [
  {
    title: 'Women',
    slug: 'women',
    image:
      'https://images.unsplash.com/photo-1589156280159-27698a70f29e?w=900',
  },
  {
    title: 'Men',
    slug: 'men',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900',
  },
  {
    title: 'Unisex',
    slug: 'unisex',
    image:
      'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900',
  },
];

export default function CategoryTiles() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 py-20">
      <div className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
          Explore
        </p>
        <h2 className="font-heading text-4xl md:text-5xl">Shop By Category</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/${cat.slug}`}
            className="group relative overflow-hidden aspect-[3/4]"
          >
            <img
              src={cat.image}
              alt={cat.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/45 transition-colors" />
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-10 text-center">
              <h3 className="font-heading text-background text-3xl md:text-4xl mb-3 tracking-wide">
                {cat.title}
              </h3>
              <span className="text-background text-xs uppercase tracking-[0.3em] border-b border-background pb-1 group-hover:border-secondary group-hover:text-secondary transition-colors">
                Shop Now
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
