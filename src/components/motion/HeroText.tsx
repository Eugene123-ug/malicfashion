import { motion, useReducedMotion } from 'framer-motion';

interface Props {
  lines: string[];
  className?: string;
  delay?: number;
}

export default function HeroText({ lines, className, delay = 0 }: Props) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <h1 className={className}>
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </h1>
    );
  }

  let wordIndex = -1;

  return (
    <h1 className={className}>
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block">
          {line.split(' ').map((word) => {
            wordIndex += 1;
            const idx = wordIndex;
            return (
              <motion.span
                key={idx}
                className="inline-block mr-[0.25em]"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: delay + idx * 0.09,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}