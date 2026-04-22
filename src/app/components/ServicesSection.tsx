import { motion } from 'motion/react';
import { Layout, Wand2, Zap, Code2, Rocket, Layers, ArrowRight } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  outcomes: string[];
}

const services: Service[] = [
  {
    id: 'ui-dev',
    icon: Layout,
    title: 'UI/UX Development',
    description:
      'Turning designs into production-ready interfaces with careful attention to responsiveness, accessibility, and cross-browser behaviour.',
    outcomes: [
      'Design-to-code with pixel accuracy',
      'WCAG accessibility compliance',
      'Cross-browser & device testing',
    ],
  },
  {
    id: 'architecture',
    icon: Code2,
    title: 'Frontend Architecture',
    description:
      'Structuring React codebases that are a pleasure to maintain — clear component boundaries, sensible state management, and thorough typing.',
    outcomes: [
      'Modular, reusable component systems',
      'TypeScript-first development',
      'Scalable file & folder conventions',
    ],
  },
  {
    id: 'animation',
    icon: Wand2,
    title: 'Motion & Animation',
    description:
      'Purposeful animations that make interfaces feel alive without sacrificing performance or distracting from the content.',
    outcomes: [
      '60fps, GPU-accelerated animations',
      'Scroll-triggered & gesture interactions',
      'Reduced-motion accessibility support',
    ],
  },
  {
    id: 'performance',
    icon: Zap,
    title: 'Performance Optimisation',
    description:
      'Auditing and improving Core Web Vitals, bundle size, and runtime performance so sites load fast and stay fast.',
    outcomes: [
      'Lighthouse score improvement',
      'Bundle splitting & lazy loading',
      'Image & asset optimisation',
    ],
  },
  {
    id: 'spa',
    icon: Rocket,
    title: 'SPA & PWA Development',
    description:
      'Building single-page and progressive web applications that behave like native apps — instant navigation, offline support, installable.',
    outcomes: [
      'Client-side routing & code splitting',
      'Service workers & offline caching',
      'Web app manifest & installability',
    ],
  },
  {
    id: 'design-system',
    icon: Layers,
    title: 'Design Systems',
    description:
      'Creating the shared language between design and engineering — tokens, components, documentation, and governance.',
    outcomes: [
      'Token-driven theming',
      'Storybook component documentation',
      'Versioned, shareable packages',
    ],
  },
];

export function ServicesSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          eyebrow="Services"
          heading="What I Do"
          subtext="Focused on frontend — from initial architecture to shipping polished interfaces."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              className="group relative flex flex-col p-6 rounded-2xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/25 transition-colors overflow-hidden"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.07 }}
              whileHover={{ y: -4 }}
            >
              {/* Hover wash */}
              <div className="absolute inset-0 bg-cyan-400/[0.025] opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

              <div className="relative flex-1">
                {/* Icon */}
                <div className="mb-4 inline-flex p-2.5 rounded-lg border border-slate-700/80 bg-slate-800/60 group-hover:border-cyan-400/30 transition-colors">
                  <service.icon className="w-5 h-5 text-cyan-400" />
                </div>

                {/* Title */}
                <h3 className="font-orbitron text-base font-semibold text-white mb-2 leading-snug group-hover:text-cyan-50 transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-grotesk text-sm text-slate-400 leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Outcomes */}
                <ul className="space-y-2">
                  {service.outcomes.map(outcome => (
                    <li key={outcome} className="flex items-start gap-2">
                      <div className="mt-1.5 w-1 h-1 rounded-full bg-cyan-400/60 shrink-0" />
                      <span className="font-grotesk text-xs text-slate-400 leading-snug">
                        {outcome}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <motion.div
          className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 px-8 py-6 rounded-2xl border border-slate-800 bg-slate-900/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <p className="font-orbitron text-sm font-semibold text-white mb-1">
              Have a project in mind?
            </p>
            <p className="font-grotesk text-sm text-slate-400">
              I take on a limited number of new projects each quarter.
            </p>
          </div>
          <motion.button
            className="font-grotesk shrink-0 flex items-center gap-2 px-6 py-3 rounded-lg border border-cyan-400/30 text-cyan-300 text-sm font-semibold hover:bg-cyan-400/8 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Get in touch
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
