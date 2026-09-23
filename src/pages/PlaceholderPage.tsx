interface Props {
  title: string;
  subtitle?: string;
}

export default function PlaceholderPage({ title, subtitle }: Props) {
  return (
    <div className="max-w-[1280px] mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-3">{title}</h1>
      <p className="text-neutral-600">
        {subtitle ?? 'This page will be built in a later phase.'}
      </p>
    </div>
  );
}
