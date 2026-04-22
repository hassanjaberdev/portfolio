import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Linkedin, Github, Mail, X } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
  { icon: Github,   label: 'GitHub',   href: 'https://github.com' },
  { icon: Mail,     label: 'Email',    href: 'mailto:hassan@example.com' },
];

export function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    /*
     * On mobile: sits above the bottom nav (bottom-20).
     * On desktop: bottom-8.
     * Uses a vertical stack expansion instead of the old radial spray
     * so nothing flies off-screen on narrow viewports.
     */
    <div className="fixed right-5 z-50 bottom-[5.5rem] md:bottom-8 flex flex-col-reverse items-center gap-2.5">

      {/* Expanded social buttons — stack upward */}
      <AnimatePresence>
        {isExpanded && socialLinks.map((link, i) => (
          <motion.a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className="relative group flex items-center justify-center w-10 h-10 rounded-full border border-slate-700/70 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
            style={{
              background: 'rgba(10, 15, 28, 0.85)',
              backdropFilter: 'blur(16px)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            }}
            initial={{ opacity: 0, y: 8, scale: 0.88 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.88 }}
            transition={{
              type: 'spring',
              stiffness: 340,
              damping: 24,
              delay: i * 0.05,
            }}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <link.icon style={{ width: 16, height: 16 }} />

            {/* Desktop tooltip */}
            <span
              className="hidden md:block absolute right-full mr-3 px-2.5 py-1 rounded-lg font-grotesk text-xs font-medium text-cyan-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
              style={{
                background: 'rgba(10,15,28,0.9)',
                border: '1px solid rgba(34,211,238,0.2)',
              }}
            >
              {link.label}
            </span>
          </motion.a>
        ))}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        onClick={() => setIsExpanded(prev => !prev)}
        aria-label={isExpanded ? 'Close contact links' : 'Open contact links'}
        className="relative flex items-center justify-center w-11 h-11 rounded-full border border-cyan-400/25 text-cyan-300 transition-colors hover:border-cyan-400/50"
        style={{
          background: 'rgba(10, 15, 28, 0.9)',
          backdropFilter: 'blur(16px)',
          boxShadow: '0 0 20px rgba(0, 200, 255, 0.12), 0 4px 16px rgba(0,0,0,0.35)',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isExpanded ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, rotate: -45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 45 }}
              transition={{ duration: 0.15 }}
            >
              <X style={{ width: 16, height: 16 }} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ opacity: 0, rotate: 45 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -45 }}
              transition={{ duration: 0.15 }}
            >
              <MessageCircle style={{ width: 16, height: 16 }} />
            </motion.span>
          )}
        </AnimatePresence>

        {/* Subtle pulse */}
        {!isExpanded && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(34,211,238,0.3)' }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
