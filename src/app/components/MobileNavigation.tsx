import { motion } from "motion/react";
import { Home, User, Briefcase, Wrench, Mail } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "projects", icon: Briefcase, label: "Projects" },
  { id: "services", icon: Wrench, label: "Services" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function MobileNavigation() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const el = document.getElementById(item.id);
          if (!el) return null;
          return { id: item.id, top: el.getBoundingClientRect().top };
        })
        .filter(Boolean) as { id: string; top: number }[];

      if (!sections.length) return;

      const viewportMid = window.innerHeight / 2;
      let closest = sections[0];
      let minDist = Math.abs(sections[0].top - viewportMid);

      sections.forEach((section) => {
        const dist = Math.abs(section.top - viewportMid);
        if (dist < minDist && section.top < viewportMid) {
          minDist = dist;
          closest = section;
        }
      });

      if (closest) setActiveSection(closest.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 20,
        behavior: "smooth",
      });
    }
  };

  const activeIndex = navItems.findIndex((item) => item.id === activeSection);
  const itemWidthPercent = 100 / navItems.length;

  return (
    <motion.nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      aria-label="Mobile navigation"
    >
      <div
        className="relative mx-3 mb-3 rounded-[1.5rem] border border-white/[0.06] overflow-hidden"
        style={{
          background: "rgba(10, 15, 28, 0.9)",
          backdropFilter: "blur(24px)",
          boxShadow:
            "0 -1px 0 rgba(255,255,255,0.04) inset, 0 8px 32px rgba(0,0,0,0.4)",
        }}
      >
        {/* Active pill */}
        <motion.div
          className="absolute top-2 bottom-2 rounded-2xl"
          style={{
            left: 0,
            width: `${itemWidthPercent}%`,
            background: "rgba(6, 182, 212, 0.08)",
            border: "1px solid rgba(34, 211, 238, 0.22)",
          }}
          animate={{
            x: `${activeIndex * 100}%`,
          }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />

        <div className="relative flex items-stretch">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                aria-label={item.label}
                aria-current={isActive ? "page" : undefined}
                className="relative z-10 flex-1 min-h-[72px] px-1 py-2 flex flex-col items-center justify-center gap-1"
              >
                <motion.div
                  animate={{ scale: isActive ? 1.06 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 22 }}
                >
                  <item.icon
                    className="transition-colors"
                    style={{
                      width: 19,
                      height: 19,
                      color: isActive ? "#67e8f9" : "#64748b",
                    }}
                  />
                </motion.div>

                <span
                  className="font-grotesk text-[11px] leading-none font-medium transition-colors text-center"
                  style={{
                    color: isActive ? "#67e8f9" : "#64748b",
                  }}
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