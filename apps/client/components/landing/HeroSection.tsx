"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayIcon, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  scrollY: number;
  openVideoModal?: () => void;
}

export const HeroSection = ({ scrollY, openVideoModal }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 overflow-hidden">
      {/* Background particles and gradient - shown based on theme mode */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.15] dark:opacity-20"></div>
      </div>

      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-500 dark:text-blue-500 light:text-indigo-600 mb-4"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">
              AI-Powered Chatbot Platform
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 text-foreground"
          >
            <span className="text-gradient">Effortless</span> Chatbot
            Integration
            <br />
            for Your Website
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-foreground/70 mb-8 max-w-2xl mx-auto"
          >
            Deploy custom AI chatbots that truly represent your brand's voice in
            minutes, with no coding required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/sign-up">
              <Button
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity dark:shadow-blue-900/20 light:shadow-indigo-400/30 light:shadow-lg"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-blue-500/20 dark:border-blue-500/20 light:border-indigo-400/40 dark:hover:bg-blue-500/10 light:hover:bg-indigo-100/70 light:hover:border-indigo-500/60 light:text-indigo-700"
              onClick={openVideoModal}
            >
              Watch Demo
              <PlayIcon className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
