"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
  iconColor?: string;
}

export const FeatureCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
  iconColor = "text-blue-500",
}: FeatureCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      viewport={{ once: true }}
      className="flex flex-col p-6 rounded-xl border border-blue-500/20 bg-card/50 backdrop-blur-sm hover:bg-card/80 transition-colors"
    >
      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
        <Icon className={`w-6 h-6 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
};
