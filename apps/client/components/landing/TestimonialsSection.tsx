"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
  rating: number;
}

export const TestimonialsSection = () => {
  const testimonials: Testimonial[] = [
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
  );
};
