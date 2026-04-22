import { motion } from "motion/react";
import { Download, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";


export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-24 md:py-32">
      <div className="relative z-10 text-center max-w-3xl mx-auto">
        {/* Profile Image */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative">
            <div className="absolute -inset-1.5 rounded-full border border-cyan-400/25" />
            <div className="absolute -inset-3 rounded-full border border-slate-700/40" />
            <ImageWithFallback
              src="/images/me.jpg"
              alt="Hasan Jaber"
              className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 object-cover object-[center_20%] rounded-full border border-slate-700/60 shadow-[0_0_30px_rgba(0,255,255,0.2)]"
              style={{ boxShadow: "0 8px 40px rgba(0, 0, 0, 0.5)" }}
            />
          </div>
        </motion.div>

        {/* Name — static after initial fade in */}
        <motion.h1
          className="font-orbitron text-4xl sm:text-5xl md:text-[3.5rem] font-bold tracking-tight text-white mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Hasan Jaber
        </motion.h1>

        {/* Role */}
        <motion.p
          className="font-grotesk text-xs sm:text-sm tracking-[0.2em] text-cyan-400 uppercase mb-6 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          Front-End Developer
        </motion.p>

        {/* Thin divider */}
        <motion.div
          className="flex items-center justify-center gap-3 mb-7"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="h-px w-10 bg-slate-700/80" />
          <div className="w-1 h-1 rounded-full bg-cyan-400/50" />
          <div className="h-px w-10 bg-slate-700/80" />
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-grotesk text-base sm:text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: "easeOut" }}
        >
          Creating exceptional web experiences through clean code, modern
          frameworks, and meticulous attention to detail.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
        >
          <motion.a
            href="/cv/cv.pdf"
            download
            className="group font-grotesk w-full sm:w-auto px-7 py-3.5 bg-white text-[#0A0F1C] rounded-lg font-semibold text-sm flex items-center justify-center gap-2 transition-colors hover:bg-slate-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Download CV
            <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </motion.a>

          <motion.button
            className="group font-grotesk w-full sm:w-auto px-7 py-3.5 border border-slate-700 rounded-lg text-slate-300 font-semibold text-sm hover:border-cyan-400/50 hover:text-cyan-300 transition-all flex items-center justify-center gap-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              document
                .getElementById("projects")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View Work
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-transparent via-slate-600 to-transparent"
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
