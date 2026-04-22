import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, Linkedin, Github, Mail, X } from 'lucide-react';
import { useState } from 'react';

const socialLinks = [
  { icon: Mail, label: 'Email', href: 'mailto:hassan@example.com' },
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
];

export function FloatingContactButton() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed right-5 z-50 bottom-[5.5rem] md:bottom-8 flex flex-col items-center gap-3">
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsExpanded((prev) => !prev)}
        aria-label={isExpanded ? 'Close contact links' : 'Open contact links'}
        className="relative flex items-center justify-center w-12 h-12 rounded-full border transition-colors"
        style={{
          background: 'rgba(10, 15, 28, 0.9)',
          backdropFilter: 'blur(16px)',
          borderColor: isExpanded
            ? 'rgba(239, 68, 68, 0.45)'
            : 'rgba(34, 211, 238, 0.25)',
          boxShadow: isExpanded
            ? '0 0 24px rgba(239, 68, 68, 0.18), 0 4px 16px rgba(0,0,0,0.35)'
            : '0 0 20px rgba(0, 200, 255, 0.12), 0 4px 16px rgba(0,0,0,0.35)',
        }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        animate={{ rotate: isExpanded ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {isExpanded ? (
            <motion.span
              key="x"
              initial={{ opacity: 0, scale: 0.85, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: 90 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center"
            >
              <X className="text-red-500" style={{ width: 18, height: 18 }} />
            </motion.span>
          ) : (
            <motion.span
              key="msg"
              initial={{ opacity: 0, scale: 0.85, rotate: 90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85, rotate: -90 }}
              transition={{ duration: 0.16 }}
              className="flex items-center justify-center"
            >
              <MessageCircle className="text-cyan-300" style={{ width: 17, height: 17 }} />
            </motion.span>
          )}
        </AnimatePresence>

        {!isExpanded && (
          <motion.span
            className="absolute inset-0 rounded-full"
            style={{ border: '1px solid rgba(34,211,238,0.3)' }}
            animate={{ scale: [1, 1.45, 1], opacity: [0.45, 0, 0.45] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </motion.button>

      {/* Expanded social buttons */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {socialLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="relative group flex items-center justify-center w-11 h-11 rounded-full border border-slate-700/70 text-slate-300 hover:text-cyan-300 hover:border-cyan-400/40 transition-colors"
                style={{
                  background: 'rgba(10, 15, 28, 0.85)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                }}
                initial={{ opacity: 0, y: -4, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -4, scale: 0.96 }}
                transition={{
                  duration: 0.22,
                  ease: 'easeOut',
                  delay: i * 0.02,
                }}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.95 }}
              >
                <link.icon style={{ width: 17, height: 17 }} />

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
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="fixed inset-0 -z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={() => setIsExpanded(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}