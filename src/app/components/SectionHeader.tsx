import { motion } from 'motion/react';

interface SectionHeaderProps {
  /** Small label above the heading, e.g. "About" */
  eyebrow: string;
  /** Main heading text */
  heading: string;
  /** Supporting paragraph */
  subtext?: string;
  /** Alignment — defaults to center */
  align?: 'left' | 'center';
  className?: string;
}

/**
 * Shared section header used by About, Skills, Services.
 * Keeps heading scale consistent (text-4xl → text-5xl) and avoids
 * the noisy gradient-on-every-heading pattern from the original code.
 * The eyebrow uses a simple cyan dot + uppercase label, no pill border.
 */
export function SectionHeader({
  eyebrow,
  heading,
  subtext,
  align = 'center',
  className = '',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <motion.div
      className={`mb-16 ${isCenter ? 'text-center' : 'text-left'} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Eyebrow */}
      <div className={`flex items-center gap-2 mb-4 ${isCenter ? 'justify-center' : ''}`}>
        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
        <span className="font-orbitron text-xs tracking-[0.18em] text-cyan-400 uppercase font-medium">
          {eyebrow}
        </span>
      </div>

      {/* Heading */}
      <h2 className="font-orbitron text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
        {heading}
      </h2>

      {/* Subtext */}
      {subtext && (
        <p
          className={`font-grotesk text-base md:text-lg text-slate-400 leading-relaxed ${
            isCenter ? 'max-w-2xl mx-auto' : 'max-w-2xl'
          }`}
        >
          {subtext}
        </p>
      )}
    </motion.div>
  );
}
