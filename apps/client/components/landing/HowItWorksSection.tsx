"use client";

import { motion } from "framer-motion";
import { Settings, Code, Zap, Sparkles } from "lucide-react";

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 dark:text-blue-400 light:text-blue-600 mb-4">
          <Zap className="w-4 h-4" />
          <span className="text-sm font-medium">Quick & Easy Setup</span>
        </div>
        <h2 className="text-4xl font-bold mb-6 text-gradient">How It Works</h2>
        <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
          Get your custom chatbot up and running in minutes with our simple
          three-step process
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
        {[
          {
            icon: (
              <Settings className="h-8 w-8 text-blue-400 dark:text-blue-400 light:text-blue-600" />
            ),
            title: "Configure",
            description:
              "Set up your chatbot's appearance, behavior, and knowledge base through our intuitive dashboard.",
            delay: 0.1,
          },
          {
            icon: (
              <Code className="h-8 w-8 text-purple-400 dark:text-purple-400 light:text-purple-600" />
            ),
            title: "Integrate",
            description:
              "Add a single line of code to your website or use our plugin for popular platforms.",
            delay: 0.3,
          },
          {
            icon: (
              <Zap className="h-8 w-8 text-pink-400 dark:text-pink-400 light:text-pink-600" />
            ),
            title: "Launch",
            description:
              "Your custom chatbot is live! Monitor performance and make adjustments in real-time.",
            delay: 0.5,
          },
        ].map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: step.delay, duration: 0.5 }}
            className="text-center relative"
          >
            <div className="relative">
              {i < 2 && (
                <motion.div
                  className="absolute top-12 left-1/2 w-full h-1 border-t-2 border-dashed border-blue-500/20 dark:border-blue-500/20 light:border-indigo-400/40 hidden md:block"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              )}

              <div className="relative z-10 flex items-center justify-center p-4 mb-6 w-24 h-24 rounded-full bg-blue-500/10 mx-auto border border-blue-500/20 dark:border-blue-500/20 light:border-indigo-400/40 animate-border-glow">
                <div className="absolute w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 -top-2 -right-2 flex items-center justify-center text-white font-bold">
                  {i + 1}
                </div>
                {step.icon}
              </div>
            </div>

            <h3 className="text-2xl font-semibold mb-3 text-white dark:text-white light:text-gray-800">
              {step.title}
            </h3>
            <p className="text-gray-300 dark:text-gray-300 light:text-gray-600 leading-relaxed">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
