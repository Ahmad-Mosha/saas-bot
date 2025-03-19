"use client";

import { motion } from "framer-motion";
import { Bot, Code, Paintbrush, Settings, Shield, Zap } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeaturesSection = () => {
  const features = [
    {
      icon: Bot,
      title: "AI-Powered Conversations",
      description:
        "Leverage advanced AI to create natural, helpful conversations that adapt to user needs.",
      iconColor: "text-blue-500",
    },
    {
      icon: Code,
      title: "Easy Integration",
      description:
        "Add our chatbot to your website with a simple code snippet. No complex setup required.",
      iconColor: "text-purple-500",
    },
    {
      icon: Settings,
      title: "Fully Customizable",
      description:
        "Tailor the chatbot's appearance and behavior to match your brand identity perfectly.",
      iconColor: "text-pink-500",
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description:
        "Your data stays protected with enterprise-grade security and privacy controls.",
      iconColor: "text-green-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Experience rapid response times that keep your users engaged and satisfied.",
      iconColor: "text-yellow-500",
    },
    {
      icon: Paintbrush,
      title: "Image Generation",
      description:
        "Create custom images and visuals directly in chat responses to enhance engagement.",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <section id="features" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powerful Features for Modern Websites
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to create intelligent, engaging chatbots that
            convert visitors into customers.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 * index}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
