import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-24 text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-neutral-600 mb-8">Page not found.</p>
      <Link
        to="/"
        className="inline-block bg-[#111111] text-white px-6 py-3 text-sm uppercase tracking-wide"
      >
        Back to Home
      </Link>
    </div>
  );
}
