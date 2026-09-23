import { Truck, ShieldCheck, RotateCcw, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: 'Fast Delivery',
    text: 'Same-day delivery in Accra. 2-3 days nationwide.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Payment',
    text: 'Shop with confidence. All payments encrypted.',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    text: '14-day returns. No questions asked.',
  },
  {
    icon: Sparkles,
    title: 'Quality Products',
    text: 'Handpicked fabrics. Made to last.',
  },
];

export default function WhyShopWithUs() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs uppercase tracking-[0.3em] text-muted mb-2">
            Why MalicFashion
          </p>
          <h2 className="font-heading text-4xl md:text-5xl">Why Shop With Us</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f) => {
            const Icon = f.icon;
            return (
              <div key={f.title} className="text-center">
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-border rounded-full">
                  <Icon className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-heading text-xl mb-2">{f.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{f.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
