"use client";

import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingCardProps {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  buttonText: string;
  buttonLink: string;
  delay?: number;
}

export const PricingCard = ({
  name,
  description,
  price,
  period,
  features,
  popular = false,
  buttonText,
  buttonLink,
  delay = 0,
}: PricingCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`relative flex flex-col p-6 rounded-xl border ${
        popular
          ? "border-blue-500/50 bg-blue-500/5"
          : "border-blue-500/20 bg-card/50"
      } backdrop-blur-sm`}
    >
      {popular && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white text-xs font-medium px-3 py-1 rounded-full">
            Most Popular
          </span>
        </div>
      )}

      <div className="flex-1">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <div className="mt-5">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-muted-foreground">/{period}</span>
        </div>

        <ul className="mt-6 space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check
                className={`h-4 w-4 ${
                  feature.included
                    ? "text-green-500"
                    : "text-muted-foreground/50"
                }`}
              />
              <span
                className={`text-sm ${
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground/50 line-through"
                }`}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-8">
        <Link href={buttonLink}>
          <Button
            className={`w-full ${
              popular
                ? "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90"
                : "bg-primary hover:bg-primary/90"
            }`}
          >
            {buttonText}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
