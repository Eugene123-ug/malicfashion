import { useEffect, useState } from 'react';

const messages = [
  'FREE DELIVERY ON ORDERS OVER GHS 500',
  'NEW DROP - SHOP THE LATEST COLLECTION',
  'EASY RETURNS WITHIN 14 DAYS',
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % messages.length);
    }, 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="w-full bg-primary text-background text-[11px] tracking-[0.25em] uppercase text-center py-2.5 px-4">
      <span key={index} className="inline-block animate-[fadeIn_0.5s_ease]">
        {messages[index]}
      </span>
      <style>{`@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }`}</style>
    </div>
  );
}
