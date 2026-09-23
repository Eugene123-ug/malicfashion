import { cn } from '../../utils/cn';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
}

export default function IconButton({ label, className, children, ...rest }: Props) {
  return (
    <button
      aria-label={label}
      className={cn(
        'inline-flex items-center justify-center w-10 h-10 text-primary transition-colors duration-200 hover:bg-border focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary rounded-full',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
