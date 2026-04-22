import { motion } from 'motion/react';
import { Mail, MapPin, Github, Linkedin, Twitter, Send, ArrowUpRight } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { SectionHeader } from './SectionHeader';

type SubmitState = 'idle' | 'sending' | 'sent' | 'error';

interface SocialLink {
  id: string;
  icon: React.ElementType;
  label: string;
  username: string;
  href: string;  // replace '#' with real URL
}

const socialLinks: SocialLink[] = [
  { id: 'github',   icon: Github,   label: 'GitHub',   username: '@hassanjaberdev', href: 'https://github.com/hassanjaberdev' },
  { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', username: 'hassanjaberdev', href: 'https://www.linkedin.com/in/hassanjaberdev/' },
  { id: 'twitter',  icon: Twitter,  label: 'Twitter',  username: '@hassanjaberdev', href: 'https://x.com/hassanjaberdev' },
];

export function ContactSection() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitState('sending');
    // TODO: wire up your form submission endpoint here
    // e.g. await fetch('/api/contact', { method: 'POST', body: new FormData(e.currentTarget) })
    await new Promise(r => setTimeout(r, 900)); // remove once real endpoint is wired
    setSubmitState('sent');
  };

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="max-w-5xl mx-auto">

        <SectionHeader
          eyebrow="Contact"
          heading="Get in Touch"
          subtext="Have a project in mind, or just want to say hello? I read every message and reply within 24 hours."
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Contact form — 3 cols */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 sm:p-8 rounded-2xl border border-slate-800 bg-slate-900/50">
              {submitState === 'sent' ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="w-12 h-12 rounded-full border border-cyan-400/30 bg-cyan-400/10 flex items-center justify-center">
                    <Send className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h3 className="font-orbitron text-lg font-bold text-white">Message sent</h3>
                  <p className="font-grotesk text-sm text-slate-400 max-w-xs">
                    Thanks for reaching out — I'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitState('idle')}
                    className="font-grotesk text-xs text-cyan-400 underline underline-offset-4 hover:text-cyan-300 transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="font-grotesk block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      className="font-grotesk w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 focus:outline-none transition-colors"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="font-grotesk block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      className="font-grotesk w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 focus:outline-none transition-colors"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="font-grotesk block text-xs font-semibold text-slate-300 mb-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      required
                      className="font-grotesk w-full px-4 py-3 bg-slate-950/60 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-600 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-400/15 focus:outline-none transition-colors resize-none"
                      placeholder="Tell me about your project…"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={submitState === 'sending'}
                    className="font-grotesk w-full flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0A0F1C] rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    whileHover={{ scale: submitState === 'sending' ? 1 : 1.01 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {submitState === 'sending' ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-[#0A0F1C]/30 border-t-[#0A0F1C] rounded-full animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Sidebar — 2 cols */}
          <motion.div
            className="lg:col-span-2 flex flex-col gap-5"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Availability */}
            <div className="flex items-start gap-3 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <motion.div
                className="mt-1 w-2.5 h-2.5 rounded-full bg-green-400 shrink-0"
                animate={{ scale: [1, 1.3, 1], opacity: [1, 0.6, 1] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              />
              <div>
                <p className="font-orbitron text-xs font-semibold text-green-400 mb-1">
                  Available for work
                </p>
                <p className="font-grotesk text-xs text-slate-400">
                  Let’s build something great together
                </p>
              </div>
            </div>

            {/* Direct email */}
            <a
              href="mailto:dev.hassan.jaber@gmail.com"
              aria-label="Send email to dev.hassan.jaber@gmail.com"
              className="group flex items-center gap-3 p-5 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-cyan-400/25 transition-colors"
            >
              <div className="p-2 rounded-lg bg-slate-800/60">
                <Mail className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-grotesk text-xs text-slate-500 mb-0.5">Email</p>
                <p className="font-grotesk text-sm text-white group-hover:text-cyan-300 transition-colors truncate">
                  dev.hassan.jaber@gmail.com
                </p>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 transition-colors shrink-0" aria-hidden="true" />
            </a>

            {/* Location */}
            <div className="flex items-center gap-3 p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <div className="p-2 rounded-lg bg-slate-800/60">
                <MapPin className="w-4 h-4 text-cyan-400" />
              </div>
              <div>
                <p className="font-grotesk text-xs text-slate-500 mb-0.5">Location</p>
                <p className="font-grotesk text-sm text-white">Remote — available globally</p>
              </div>
            </div>

            {/* Social links */}
            <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/50">
              <p className="font-orbitron text-xs font-semibold text-slate-400 tracking-wider mb-4 uppercase">
                Find me online
              </p>
              <div className="space-y-2">
                {socialLinks.map(s => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${s.label} profile: ${s.username}`}
                    className="group flex items-center justify-between py-2 px-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <s.icon className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                      <div>
                        <p className="font-grotesk text-xs font-medium text-white group-hover:text-cyan-50 transition-colors">
                          {s.label}
                        </p>
                        <p className="font-grotesk text-[10px] text-slate-500">{s.username}</p>
                      </div>
                    </div>
                    <ArrowUpRight className="w-3 h-3 text-slate-700 group-hover:text-cyan-400 transition-colors" aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center">
          <p className="font-grotesk text-xs text-slate-600">
            © {new Date().getFullYear()} Hasan Jaber · Built with React, TypeScript & Tailwind CSS
          </p>
        </div>
      </div>
    </section>
  );
}
