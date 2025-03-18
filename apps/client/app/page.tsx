"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import {
  Bot,
  Code,
  Paintbrush,
  Settings,
  Shield,
  Sparkles,
  Zap,
  Menu,
  X,
  Github,
  Twitter,
  Check,
  ArrowRight,
  Calendar,
  LineChart,
  Star,
  Play as PlayIcon,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChatDemo } from "@/components/chat-demo";

// Define the navFadeIn animation variable
const navFadeIn = {
  hidden: { y: -20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

const TopNavigation = ({
  isMenuOpen,
  setIsMenuOpen,
}: {
  isMenuOpen: boolean;
  setIsMenuOpen: (value: boolean) => void;
}) => {
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

// Hero section update to support refined light mode
const HeroSection = ({ scrollY }: { scrollY: number }) => {
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

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Handle scroll for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle escape key to close video modal
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsVideoModalOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // Handle modal closing and video pause
  useEffect(() => {
    if (!isVideoModalOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoModalOpen]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const features = [
    {
      icon: <Bot className="w-10 h-10 text-blue-400" />,
      title: "No-Code Integration",
      description:
        "Add a chatbot to your website with just a few clicks. No coding required.",
      image:
        "https://images.unsplash.com/photo-1676299081847-5c7fe2a16d3d?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Paintbrush className="w-10 h-10 text-purple-400" />,
      title: "Customizable Interface",
      description:
        "Personalize your chatbot's appearance to match your brand identity perfectly.",
      image:
        "https://images.unsplash.com/photo-1618788372246-79faff0c3742?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Shield className="w-10 h-10 text-pink-400" />,
      title: "Topic Control",
      description:
        "Keep your chatbot focused and on-brand with advanced topic control features.",
      image:
        "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Zap className="w-10 h-10 text-yellow-400" />,
      title: "Instant Setup",
      description:
        "Deploy your custom chatbot in minutes with our streamlined setup process.",
      image:
        "https://images.unsplash.com/photo-1647166545674-ce28ce93bdca?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Settings className="w-10 h-10 text-green-400" />,
      title: "Advanced Configuration",
      description:
        "Fine-tune every aspect of your chatbot through our intuitive dashboard.",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    },
    {
      icon: <Code className="w-10 h-10 text-indigo-400" />,
      title: "API Access",
      description:
        "Unlock unlimited possibilities with our comprehensive API integration.",
      image:
        "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const testimonials = [
    {
      quote:
        "ChatBot.ai transformed our customer service. We're handling 60% more inquiries with the same team size!",
      author: "Sarah Johnson",
      role: "CTO, StreamComm",
      avatar: "https://randomuser.me/api/portraits/women/32.jpg",
      rating: 5,
    },
    {
      quote:
        "Setting up took minutes, not weeks. The topic control feature ensures our brand voice stays consistent across all conversations.",
      author: "Michael Chen",
      role: "Marketing Director, TechVista",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 5,
    },
    {
      quote:
        "The customization options are incredible. Our chatbot feels like a natural extension of our website design.",
      author: "Emma Thompson",
      role: "Design Lead, Artify",
      avatar: "https://randomuser.me/api/portraits/women/41.jpg",
      rating: 4,
    },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
      <TopNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection scrollY={scrollY} />

      {/* How It Works Section */}
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
          <h2 className="text-4xl font-bold mb-6 text-gradient">
            How It Works
          </h2>
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

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-32 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 dark:text-blue-400 light:text-blue-600 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Powerful Features</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">
            Everything You Need
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
            A complete suite of tools designed to make chatbot integration
            seamless and powerful
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="group p-8 h-full bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-all duration-300 hover:shadow-lg dark:border-blue-500/20 light:border-indigo-400/30 dark:hover:border-blue-500/40 light:hover:border-indigo-500/60 overflow-hidden relative animate-border-glow premium-accent-line">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 bg-gradient-to-br from-indigo-500/10 via-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10">
                  <motion.div
                    className="mb-6 p-3 rounded-lg dark:bg-blue-500/10 light:bg-indigo-500/10 dark:group-hover:bg-blue-500/20 light:group-hover:bg-indigo-500/20 w-fit shadow-sm"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <h3 className="text-2xl font-semibold mb-3 dark:text-white light:text-gray-800 group-hover:dark:text-white/90 group-hover:light:text-indigo-900/90">
                    {feature.title}
                  </h3>
                  <p className="dark:text-gray-300 light:text-gray-600 text-lg leading-relaxed group-hover:dark:text-gray-200 group-hover:light:text-gray-700">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials Section */}
      <section
        id="testimonials"
        className="container mx-auto px-4 py-32 relative"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 text-blue-400 dark:text-blue-400 light:text-blue-600 mb-4">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">Customer Success</span>
          </div>
          <h2 className="text-4xl font-bold mb-6 text-gradient">
            Loved by Businesses
          </h2>
          <p className="text-xl text-gray-300 dark:text-gray-300 light:text-gray-700 max-w-2xl mx-auto">
            See what our customers have to say about their experience with
            ChatBot.ai
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group"
            >
              <div className="bg-card/50 backdrop-blur-sm p-8 rounded-xl border dark:border-blue-500/20 light:border-indigo-300/50 animate-border-glow testimonial-card premium-accent-line">
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < testimonial.rating
                          ? "text-yellow-400"
                          : "text-gray-600 dark:text-gray-600 light:text-gray-300"
                      }`}
                      fill={i < testimonial.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                <p className="text-lg dark:text-gray-300 light:text-gray-700 mb-6 italic group-hover:dark:text-gray-200 group-hover:light:text-gray-800">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full mr-4 border-2 dark:border-blue-500/30 light:border-indigo-400/50 transition-all duration-300 group-hover:dark:border-blue-500/50 group-hover:light:border-indigo-500/70"
                  />
                  <div>
                    <h4 className="dark:text-white light:text-gray-800 font-medium">
                      {testimonial.author}
                    </h4>
                    <p className="dark:text-gray-400 light:text-gray-500 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
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

      {/* Footer */}
      <footer className="border-t dark:border-blue-500/20 light:border-indigo-300/30 bg-background/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gradient mb-6">
                ChatBot.ai
              </h3>
              <p className="dark:text-gray-400 light:text-gray-600 mb-6">
                Building the future of website interactions, one conversation at
                a time.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="dark:text-gray-400 light:text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Github className="w-6 h-6" />
                </a>
                <a
                  href="#"
                  className="dark:text-gray-400 light:text-gray-500 hover:text-blue-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="dark:text-white light:text-gray-800 font-semibold mb-4">
                Product
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#features"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="dark:text-white light:text-gray-800 font-semibold mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="dark:text-gray-400 light:text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="dark:text-white light:text-gray-800 font-semibold mb-4">
                Connect
              </h4>
              <div className="mt-6">
                <Link
                  href="/sign-in"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign In
                </Link>
                <span className="mx-2 text-gray-500">•</span>
                <Link
                  href="/sign-up"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t dark:border-blue-500/20 light:border-indigo-300/30 text-center dark:text-gray-400 light:text-gray-500">
            <p>&copy; 2025 ChatBot.ai. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Video Demo Modal */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            className="relative bg-card/90 rounded-2xl overflow-hidden w-full max-w-4xl shadow-2xl"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center p-4 border-b border-blue-500/20">
              <h3 className="text-xl font-semibold text-gradient">
                ChatBot.ai Demo
              </h3>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-white/10"
                onClick={() => setIsVideoModalOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="aspect-video bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                controls
                autoPlay
                src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="p-4">
              <p className="text-gray-300">
                See how easy it is to set up your own AI-powered chatbot in
                minutes. This demo shows the complete process from configuration
                to deployment.
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* Chatbot Demo Component */}
      <ChatDemo />
    </div>
  );
}
