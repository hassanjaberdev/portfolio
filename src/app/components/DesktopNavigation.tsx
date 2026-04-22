import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export function DesktopNavigation() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = navItems.map(item => {
        const el = document.getElementById(item.id);
        if (!el) return null;
        return { id: item.id, top: el.getBoundingClientRect().top };
      }).filter(Boolean) as { id: string; top: number }[];

      const viewportMid = window.innerHeight / 2;
      let closest = sections[0];
      let minDist = Math.abs(sections[0].top - viewportMid);

      sections.forEach(s => {
        const dist = Math.abs(s.top - viewportMid);
        if (dist < minDist && s.top < viewportMid) {
          minDist = dist;
          closest = s;
        }
      });

      if (closest) setActiveSection(closest.id);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' });
    }
    setActiveSection(id);
  };

  return (
    <motion.header
      className="hidden md:flex fixed top-0 left-0 right-0 z-50 justify-center pt-5"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <nav
        className="flex items-center gap-1 px-2 py-1.5 rounded-2xl border transition-all duration-300"
        style={{
          background: scrolled
            ? 'rgba(10, 15, 28, 0.85)'
            : 'rgba(10, 15, 28, 0.5)',
          borderColor: scrolled
            ? 'rgba(34, 211, 238, 0.15)'
            : 'rgba(255,255,255,0.06)',
          backdropFilter: 'blur(20px)',
          boxShadow: scrolled
            ? '0 4px 24px rgba(0,0,0,0.3), 0 1px 0 rgba(255,255,255,0.04) inset'
            : 'none',
        }}
        aria-label="Main navigation"
      >
        {navItems.map(item => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleClick(item.id)}
              className="relative px-4 py-2 rounded-xl font-grotesk text-sm font-medium transition-colors"
              style={{ color: isActive ? '#67e8f9' : '#94a3b8' }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'rgba(6, 182, 212, 0.08)',
                    border: '1px solid rgba(34, 211, 238, 0.18)',
                  }}
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </motion.header>
  );
}
