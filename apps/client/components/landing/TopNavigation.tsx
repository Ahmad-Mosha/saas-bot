"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Bot, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the navFadeIn animation variable
const navFadeIn = {
  hidden: { y: -20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

interface TopNavigationProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}

export const TopNavigation = ({
  isMenuOpen,
  setIsMenuOpen,
}: TopNavigationProps) => {
  return (
    <motion.header
      variants={navFadeIn}
      className="fixed top-0 left-0 right-0 z-50 py-4 bg-background/80 backdrop-blur-md border-b border-blue-500/20 dark:border-blue-500/20 light:border-indigo-500/30 light:shadow-sm light:shadow-indigo-100"
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 z-10">
          <Bot className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-gradient">ChatBot.ai</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="#features"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Features
          </Link>
          <Link
            href="#testimonials"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Testimonials
          </Link>
          <Link
            href="#pricing"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/sign-in"
            className="text-sm text-foreground/80 hover:text-foreground transition-colors"
          >
            Sign In
          </Link>
          <Link href="/sign-up">
            <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity dark:shadow-md dark:shadow-blue-900/20 light:shadow-lg light:shadow-indigo-200/30">
              Get Started
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden z-10"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-foreground" />
          ) : (
            <Menu className="w-6 h-6 text-foreground" />
          )}
        </button>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="absolute top-0 left-0 right-0 p-4 pt-20 bg-background border-b border-blue-500/20 flex flex-col gap-4 md:hidden"
          >
            <Link
              href="#features"
              className="text-foreground/80 hover:text-foreground px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="#testimonials"
              className="text-foreground/80 hover:text-foreground px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </Link>
            <Link
              href="#pricing"
              className="text-foreground/80 hover:text-foreground px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/sign-in"
              className="text-foreground/80 hover:text-foreground px-4 py-2 rounded-lg hover:bg-blue-500/10 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="mt-2"
              onClick={() => setIsMenuOpen(false)}
            >
              <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                Get Started
              </Button>
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};
