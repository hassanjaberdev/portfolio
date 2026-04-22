import { motion } from 'motion/react';
import { Code2, Smartphone, Wrench, Palette } from 'lucide-react';
import { SectionHeader } from './SectionHeader';

/**
 * Skill level is conveyed by a filled-dot system and a tier label,
 * not a self-reported percentage bar. This reads as more credible
 * to senior reviewers while still showing relative depth.
 */

type SkillTier = 'Expert' | 'Proficient' | 'Familiar';

interface Skill {
  name: string;
  tier: SkillTier;
  note: string;
}

interface SkillCategory {
  id: string;
  label: string;
  icon: React.ElementType;
  skills: Skill[];
}

const TIER_DOTS: Record<SkillTier, number> = {
  Expert:     5,
  Proficient: 4,
  Familiar:   3,
};

const TIER_COLOR: Record<SkillTier, string> = {
  Expert:     'text-cyan-400',
  Proficient: 'text-slate-300',
  Familiar:   'text-slate-500',
};

const skillCategories: SkillCategory[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    icon: Code2,
    skills: [
      { name: 'React',            tier: 'Expert',     note: 'Hooks, context, performance patterns' },
      { name: 'TypeScript',       tier: 'Expert',     note: 'Type-safe architecture at scale'       },
      { name: 'JavaScript ES6+',  tier: 'Expert',     note: 'Modern syntax, async patterns'         },
      { name: 'HTML5 & CSS3',     tier: 'Expert',     note: 'Semantic markup, layout, animations'   },
    ],
  },
  {
    id: 'mobile',
    label: 'Mobile & Cross-Platform',
    icon: Smartphone,
    skills: [
      { name: 'React Native',     tier: 'Proficient', note: 'Native iOS & Android apps'       },
      { name: 'Responsive Design',tier: 'Expert',     note: 'Mobile-first, fluid layouts'     },
      { name: 'PWA',              tier: 'Proficient', note: 'Service workers, offline caching' },
    ],
  },
  {
    id: 'tooling',
    label: 'Tooling & Infrastructure',
    icon: Wrench,
    skills: [
      { name: 'Vite / Webpack',   tier: 'Proficient', note: 'Build optimisation, code splitting' },
      { name: 'Git & GitHub',     tier: 'Expert',     note: 'PRs, CI workflows, branching'       },
      { name: 'REST & GraphQL',   tier: 'Proficient', note: 'Data fetching, caching strategies'  },
    ],
  },
  {
    id: 'design',
    label: 'UI & Design',
    icon: Palette,
    skills: [
      { name: 'Tailwind CSS',     tier: 'Expert',     note: 'Utility-first, design systems'    },
      { name: 'Framer Motion',    tier: 'Expert',     note: '60fps animations, layout effects' },
      { name: 'Figma',            tier: 'Proficient', note: 'Design handoff, prototyping'      },
    ],
  },
];

function DotRating({ tier }: { tier: SkillTier }) {
  const filled = TIER_DOTS[tier];
  return (
    <div className="flex items-center gap-1" aria-label={tier}>
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={i}
          className={`w-1.5 h-1.5 rounded-full transition-colors ${
            i < filled ? 'bg-cyan-400' : 'bg-slate-700'
          }`}
        />
      ))}
    </div>
  );
}

export function SkillsSection() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">

        <SectionHeader
          eyebrow="Skills"
          heading="Technical Stack"
          subtext="Technologies I reach for regularly, and a few I'm still deepening."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category, ci) => (
            <motion.div
              key={category.id}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/50"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: ci * 0.08 }}
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-800">
                <div className="p-2 rounded-lg bg-slate-800/80">
                  <category.icon className="w-4 h-4 text-cyan-400" />
                </div>
                <h3 className="font-orbitron text-sm font-semibold text-white tracking-wide">
                  {category.label}
                </h3>
              </div>

              {/* Skill rows */}
              <div className="space-y-4">
                {category.skills.map((skill, si) => (
                  <motion.div
                    key={skill.name}
                    className="flex items-start justify-between gap-4"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: ci * 0.08 + si * 0.05 }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-grotesk text-sm font-semibold text-white mb-0.5 leading-snug">
                        {skill.name}
                      </div>
                      <div className="font-grotesk text-xs text-slate-500 leading-snug">
                        {skill.note}
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0 pt-0.5">
                      <DotRating tier={skill.tier} />
                      <span className={`font-grotesk text-[10px] font-medium ${TIER_COLOR[skill.tier]}`}>
                        {skill.tier}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-8 flex items-center justify-center gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {(['Expert', 'Proficient', 'Familiar'] as SkillTier[]).map(tier => (
            <div key={tier} className="flex items-center gap-2">
              <DotRating tier={tier} />
              <span className="font-grotesk text-xs text-slate-500">{tier}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
