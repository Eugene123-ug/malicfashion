import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroText from '../motion/HeroText';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] sm:h-[80vh] md:h-[85vh] min-h-[480px] md:min-h-[560px] overflow-hidden">
      <motion.img
        src="/images/editorial-shopping.jpg"
        alt="Fashion editorial"
        className="absolute inset-0 w-full h-full object-cover"
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative h-full max-w-[1280px] mx-auto px-4 sm:px-6 flex flex-col justify-center">
        <motion.p
          className="text-background/80 text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          New Season - 2026
        </motion.p>

        <HeroText
          lines={['The New Standard', 'of Style']}
          className="font-heading text-background text-3xl sm:text-5xl md:text-7xl lg:text-8xl leading-[1.05] max-w-3xl"
          delay={0.25}
        />

        <motion.p
          className="text-background/80 text-sm sm:text-base md:text-lg max-w-xl mt-4 sm:mt-6"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.0 }}
        >
          Contemporary fashion designed for confident, modern living.
        </motion.p>

        <motion.div
          className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md sm:max-w-none"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.15 }}
        >
          <Link
            to="/women"
            className="inline-flex items-center justify-center bg-background text-primary text-xs uppercase tracking-widest px-6 sm:px-8 py-3 sm:py-4 hover:bg-secondary transition-colors"
          >
            Shop Women
          </Link>
          <Link
            to="/men"
            className="inline-flex items-center justify-center border border-background text-background text-xs uppercase tracking-widest px-6 sm:px-8 py-3 sm:py-4 hover:bg-background hover:text-primary transition-colors"
          >
            Shop Men
          </Link>
        </motion.div>
      </div>
    </section>
  );
}