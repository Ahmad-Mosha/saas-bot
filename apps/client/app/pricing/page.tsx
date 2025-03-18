"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronLeft, HelpCircle, XCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

interface PricingFeature {
  name: string;
  free: boolean;
  pro: boolean;
  enterprise: boolean;
}

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">(
    "monthly"
  );

  const features: PricingFeature[] = [
    { name: "Chatbot Integration", free: true, pro: true, enterprise: true },
    { name: "Basic Customization", free: true, pro: true, enterprise: true },
    { name: "1,000 Monthly Messages", free: true, pro: true, enterprise: true },
    { name: "Community Support", free: true, pro: true, enterprise: true },
    { name: "Custom UI Themes", free: false, pro: true, enterprise: true },
    {
      name: "10,000 Monthly Messages",
      free: false,
      pro: true,
      enterprise: true,
    },
    { name: "Topic Control", free: false, pro: true, enterprise: true },
    { name: "Priority Support", free: false, pro: true, enterprise: true },
    { name: "Advanced Analytics", free: false, pro: false, enterprise: true },
    {
      name: "Unlimited Monthly Messages",
      free: false,
      pro: false,
      enterprise: true,
    },
    { name: "Custom AI Training", free: false, pro: false, enterprise: true },
    {
      name: "Dedicated Account Manager",
      free: false,
      pro: false,
      enterprise: true,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="relative min-h-screen pt-20 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-16">
          <Link
            href="/"
            className="text-lg font-medium text-gradient flex items-center gap-2"
          >
            <ChevronLeft className="h-5 w-5" />
            Back to Home
          </Link>
          <div className="text-sm text-muted-foreground">
            <span>Need help choosing? </span>
            <Link href="#" className="text-gradient">
              Contact sales
            </Link>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h1 className="text-5xl font-bold mb-4 text-gradient">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            Choose the perfect plan for your chatbot needs. Start small and
            scale as you grow.
          </p>

          <Tabs
            defaultValue="monthly"
            value={billingCycle}
            onValueChange={(v) => setBillingCycle(v as "monthly" | "yearly")}
            className="w-fit mx-auto"
          >
            <TabsList className="bg-blue-500/10 border border-blue-500/20">
              <TabsTrigger value="monthly" className="relative">
                Monthly
              </TabsTrigger>
              <TabsTrigger value="yearly" className="relative">
                Yearly
                <span className="absolute -top-3 -right-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                  Save 20%
                </span>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
        >
          {/* Free Plan */}
          <motion.div variants={item}>
            <Card className="border-blue-500/20 backdrop-blur-sm bg-card/50 h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Free</CardTitle>
                <CardDescription>
                  Perfect for personal projects and small websites
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                </div>
                <Button className="w-full" variant="outline">
                  Get Started
                </Button>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {feature.free ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span
                        className={!feature.free ? "text-muted-foreground" : ""}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pro Plan */}
          <motion.div variants={item}>
            <Card className="border-blue-500/20 bg-card/70 backdrop-blur-sm relative h-full animate-border-glow">
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-lg" />
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-3 py-1 rounded-full">
                Popular
              </div>
              <CardHeader className="pt-8">
                <CardTitle className="text-2xl">Pro</CardTitle>
                <CardDescription>
                  For growing businesses and serious developers
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-4xl font-bold">
                    ${billingCycle === "monthly" ? "29" : "23"}
                  </span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                  {billingCycle === "yearly" && (
                    <div className="text-sm text-green-500 mt-1">
                      Billed annually (${23 * 12})
                    </div>
                  )}
                </div>
                <Button className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                  Start Free Trial
                </Button>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {feature.pro ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span
                        className={!feature.pro ? "text-muted-foreground" : ""}
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div variants={item}>
            <Card className="border-blue-500/20 backdrop-blur-sm bg-card/50 h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <CardDescription>
                  For large organizations with custom requirements
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <span className="text-4xl font-bold">
                    ${billingCycle === "monthly" ? "99" : "79"}
                  </span>
                  <span className="text-muted-foreground ml-1">/ month</span>
                  {billingCycle === "yearly" && (
                    <div className="text-sm text-green-500 mt-1">
                      Billed annually (${79 * 12})
                    </div>
                  )}
                </div>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
                <Separator className="my-4" />
                <div className="space-y-2">
                  {features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {feature.enterprise ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          !feature.enterprise ? "text-muted-foreground" : ""
                        }
                      >
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center text-gradient">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {[
              {
                question: "Can I switch plans later?",
                answer:
                  "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you'll be charged the prorated amount for the remainder of your billing cycle. When downgrading, the new rate will apply at the start of your next billing cycle.",
              },
              {
                question: "What happens when I reach my message limit?",
                answer:
                  "When you approach your monthly message limit, we'll notify you so you can upgrade if needed. If you exceed your limit, your chatbot will continue to function, but you'll be charged a small fee for each additional message.",
              },
              {
                question: "Is there a free trial for the Pro plan?",
                answer:
                  "Yes, we offer a 14-day free trial of the Pro plan with no credit card required. You can experience all the features before deciding to subscribe.",
              },
              {
                question: "What kind of support is included?",
                answer:
                  "The Free plan includes community support via our forums. The Pro plan includes email support with 24-hour response time. The Enterprise plan includes priority support with a 4-hour response time and a dedicated account manager.",
              },
              {
                question: "Can I get a refund if I'm not satisfied?",
                answer:
                  "We offer a 30-day money-back guarantee for the Pro and Enterprise plans. If you're not satisfied with our service, contact support within 30 days of your purchase for a full refund.",
              },
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-card/50 border border-blue-500/20 rounded-lg p-6"
              >
                <div className="flex items-start gap-3">
                  <HelpCircle className="h-6 w-6 text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
