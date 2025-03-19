"use client";

import { motion } from "framer-motion";
import { PricingCard } from "./PricingCard";

export const PricingSection = () => {
  const pricingPlans = [
    {
      name: "Free",
      description: "Perfect for trying out our platform",
      price: "$0",
      period: "month",
      features: [
        { text: "1 Chatbot", included: true },
        { text: "100 messages/month", included: true },
        { text: "Basic customization", included: true },
        { text: "Standard response time", included: true },
        { text: "Community support", included: true },
        { text: "Analytics dashboard", included: false },
        { text: "Custom branding", included: false },
        { text: "Priority support", included: false },
      ],
      popular: false,
      buttonText: "Start Free",
      buttonLink: "/sign-up",
    },
    {
      name: "Pro",
      description: "For growing businesses and professionals",
      price: "$29",
      period: "month",
      features: [
        { text: "5 Chatbots", included: true },
        { text: "10,000 messages/month", included: true },
        { text: "Advanced customization", included: true },
        { text: "Fast response time", included: true },
        { text: "Email support", included: true },
        { text: "Analytics dashboard", included: true },
        { text: "Custom branding", included: true },
        { text: "Priority support", included: false },
      ],
      popular: true,
      buttonText: "Get Started",
      buttonLink: "/sign-up",
    },
    {
      name: "Enterprise",
      description: "For large businesses with advanced needs",
      price: "$99",
      period: "month",
      features: [
        { text: "Unlimited Chatbots", included: true },
        { text: "Unlimited messages", included: true },
        { text: "Full customization", included: true },
        { text: "Fastest response time", included: true },
        { text: "24/7 phone support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Custom branding", included: true },
        { text: "Priority support", included: true },
      ],
      popular: false,
      buttonText: "Contact Sales",
      buttonLink: "/contact",
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground">
            Choose the plan that's right for your business, with no hidden fees
            or complicated pricing structures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <PricingCard
              key={index}
              name={plan.name}
              description={plan.description}
              price={plan.price}
              period={plan.period}
              features={plan.features}
              popular={plan.popular}
              buttonText={plan.buttonText}
              buttonLink={plan.buttonLink}
              delay={0.1 * index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
