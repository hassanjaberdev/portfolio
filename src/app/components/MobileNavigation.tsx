import { motion } from 'motion/react';
import { Home, User, Briefcase, Wrench, Mail } from 'lucide-react';
import { useState, useEffect } from 'react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'about', icon: User, label: 'About' },
  { id: 'projects', icon: Briefcase, label: 'Projects' },
  { id: 'services', icon: Wrench, label: 'Services' },
  { id: 'contact', icon: Mail, label: 'Contact' },
];

export function MobileNavigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
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

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({ top: el.offsetTop - 20, behavior: 'smooth' });
    }
  };

  const activeIndex = navItems.findIndex(item => item.id === activeSection);

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 24 }}
      aria-label="Mobile navigation"
    >
      <div
        className="relative mx-3 mb-3 overflow-hidden rounded-2xl border border-white/[0.06]"
        style={{
          background: 'rgba(10, 15, 28, 0.88)',
          backdropFilter: 'blur(24px)',
          boxShadow: '0 -1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)',
        }}
      >
        {/* Sliding indicator */}
        <motion.div
          className="absolute top-1.5 h-9 rounded-xl"
          style={{
            width: `calc(${100 / navItems.length}% - 8px)`,
            background: 'rgba(6, 182, 212, 0.08)',
            border: '1px solid rgba(34, 211, 238, 0.2)',
          }}
          animate={{
            x: `calc(${activeIndex * 100}% + ${activeIndex * 8 + 4}px)`,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />

        <div className="relative flex items-center justify-around px-1 py-1.5">
          {navItems.map(item => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                aria-current={isActive ? 'page' : undefined}
                className="relative flex flex-col items-center justify-center gap-0.5 py-2 px-3 z-10"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 22 }}
                >
                  <item.icon
                    className="transition-colors"
                    style={{
                      width: 17,
                      height: 17,
                      color: isActive ? '#67e8f9' : '#64748b',
                    }}
                  />
                </motion.div>
                <span
                  className="font-grotesk text-[10px] font-medium transition-colors"
                  style={{ color: isActive ? '#67e8f9' : '#64748b' }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
