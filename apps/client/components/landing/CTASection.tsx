"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const CTASection = () => {
  return (
    <section className="container mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl dark:bg-gradient-to-r dark:from-blue-600/20 dark:via-purple-600/20 dark:to-pink-600/20 light:bg-white light:bg-opacity-80 light:backdrop-blur-md p-12 md:p-20 text-center relative overflow-hidden dark:border dark:border-blue-500/20 light:border light:border-indigo-200/60 light:shadow-xl light:shadow-indigo-100/20"
      >
        {/* Background elements */}
        <div className="absolute top-0 left-0 right-0 bottom-0 overflow-hidden">
          {/* Dark mode elements */}
          <div className="dark:block hidden">
            <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-blue-600/20 blur-[100px]" />
            <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-pink-600/20 blur-[100px]" />
          </div>

          {/* Light mode elements */}
          <div className="light:block dark:hidden">
            <div className="absolute -top-20 -right-20 h-60 w-60 rounded-full bg-gradient-to-br from-blue-100 to-indigo-100 blur-3xl opacity-70" />
            <div className="absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 blur-3xl opacity-70" />
            <div className="absolute inset-0 bg-mesh-gradient opacity-30"></div>
          </div>
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Ready to Transform Your Customer Experience?
          </h2>
          <p className="text-xl dark:text-white/80 light:text-gray-700 max-w-3xl mx-auto mb-10">
            Join thousands of businesses already using ChatBot.ai to create
            engaging, intelligent conversations with their customers.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button className="w-full sm:w-auto text-base bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity btn-hover-effect light:shadow-lg light:shadow-indigo-200/20">
                Get Started For Free
              </Button>
            </Link>
            <Link href="/sign-in">
              <Button
                variant="outline"
                className="w-full sm:w-auto text-base dark:border-blue-500/20 dark:hover:bg-blue-500/10 light:border-indigo-300/50 light:hover:bg-indigo-50/80 hover-lift"
              >
                Login to Dashboard
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <Check className="text-green-400 dark:text-green-400 light:text-green-500 h-5 w-5" />
            <span className="dark:text-white/80 light:text-gray-700">
              No credit card required
            </span>
            <span className="mx-2 dark:text-white/30 light:text-gray-400">
              •
            </span>
            <Check className="text-green-400 dark:text-green-400 light:text-green-500 h-5 w-5" />
            <span className="dark:text-white/80 light:text-gray-700">
              Cancel anytime
            </span>
            <span className="mx-2 dark:text-white/30 light:text-gray-400">
              •
            </span>
            <Check className="text-green-400 dark:text-green-400 light:text-green-500 h-5 w-5" />
            <span className="dark:text-white/80 light:text-gray-700">
              24/7 support
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
