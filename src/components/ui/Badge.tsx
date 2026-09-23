import { cn } from '../../utils/cn';

type Variant = 'primary' | 'secondary' | 'success' | 'error' | 'muted';

interface Props {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export default function Badge({ children, variant = 'primary', className }: Props) {
  const variants: Record<Variant, string> = {
    primary: 'bg-primary text-background',
    secondary: 'bg-secondary text-primary',
    success: 'bg-success text-background',
    error: 'bg-error text-background',
    muted: 'bg-border text-muted',
  };

  return (
    <span
      className={cn(
        'inline-block text-[10px] font-medium uppercase tracking-widest px-2 py-1',
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
