import { motion } from 'motion/react';
import { Code2, Sparkles, Rocket, Target } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

const stats = [
  { icon: Code2,     value: '5+',   label: 'Years experience',  detail: 'React, TypeScript, modern CSS'          },
  { icon: Sparkles,  value: '50+',  label: 'Projects delivered', detail: 'From startups to enterprise products'  },
  { icon: Rocket,    value: '99',   label: 'Lighthouse score',   detail: 'Performance, accessibility, best practices' },
  { icon: Target,    value: '100%', label: 'Client satisfaction', detail: 'Clear communication, on-time delivery' },
];

export function AboutSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          eyebrow="About"
          heading="Who I Am"
          subtext="I'm a Front-End Developer focused on building fast, accessible, and well-crafted web products. I care about the details — both in code and in design."
        />

        {/* Two-column layout: bio left, stats right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left — bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5"
          >
            <p className="font-grotesk text-slate-300 leading-relaxed text-base md:text-lg">
              With five years of experience shipping production React applications, I've learned
              that the best interfaces feel invisible — they get out of the user's way and let
              the product speak for itself.
            </p>
            <p className="font-grotesk text-slate-400 leading-relaxed">
              I work across the full frontend stack: component architecture, state management,
              animations, performance tuning, and design systems. I'm equally comfortable
              in a Figma file or a terminal.
            </p>
            <p className="font-grotesk text-slate-400 leading-relaxed">
              Outside of client work I contribute to open-source tools, write about frontend
              patterns, and tinker with generative interfaces.
            </p>

            {/* Simple specialisation tags — single accent color */}
            <div className="flex flex-wrap gap-2 pt-2">
              {[
                'React & TypeScript',
                'Motion & Animation',
                'Design Systems',
                'Performance',
                'Accessibility',
              ].map(tag => (
                <span
                  key={tag}
                  className="font-grotesk text-xs px-3 py-1.5 rounded-lg border border-slate-700/80 text-slate-400 bg-slate-900/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="group relative p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/30 transition-colors overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -3 }}
              >
                {/* Hover background wash */}
                <div className="absolute inset-0 bg-cyan-400/[0.03] opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

                <div className="relative">
                  <div className="mb-3 inline-flex p-2 rounded-lg bg-slate-800/60">
                    <s.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="font-orbitron text-2xl font-bold text-white mb-0.5">
                    {s.value}
                  </div>
                  <div className="font-grotesk text-xs text-cyan-400 font-medium mb-1">
                    {s.label}
                  </div>
                  <div className="font-grotesk text-xs text-slate-500 leading-snug">
                    {s.detail}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
