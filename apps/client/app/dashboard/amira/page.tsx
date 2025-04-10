"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Crown, Star, Sparkles, Music } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AmiraPage() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  const loveMessages = [
    "Amira, you are the light of my life ✨",
    "Every moment with you is a treasure 💎",
    "Your smile brightens my darkest days 🌞",
    "You're my princess, my everything 👑",
    "Forever and always, I love you ❤️",
    "You make my heart skip a beat 💓",
    "My love for you grows stronger each day 🌱",
    "You are my happily ever after 📖",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % loveMessages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Create random hearts on screen
  const hearts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 1.5 + 0.5,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 10,
  }));

  return (
    <div className="relative min-h-[80vh] flex flex-col items-center justify-center px-4 overflow-hidden">
      {/* Floating hearts background */}
      <AnimatePresence>
        {showHearts &&
          hearts.map((heart) => (
            <motion.div
              key={heart.id}
              className="absolute text-pink-500 z-0"
              initial={{
                opacity: 0,
                x: `${heart.x}vw`,
                y: "100vh",
                scale: heart.size,
              }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: `${heart.x}vw`,
                y: "0vh",
                scale: heart.size,
              }}
              transition={{
                repeat: Infinity,
                duration: heart.duration,
                delay: heart.delay,
                ease: "easeOut",
              }}
            >
              <Heart fill="currentColor" />
            </motion.div>
          ))}
      </AnimatePresence>

      {/* Main content */}
      <div className="z-10 text-center mb-12">
        <motion.div
          className="inline-block mb-6"
          initial={{ y: -20 }}
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        >
          <div className="relative">
            <Crown
              className="h-20 w-20 text-yellow-400 drop-shadow-lg"
              strokeWidth={1.5}
              fill="rgba(250, 204, 21, 0.5)"
            />
            <motion.div
              className="absolute top-0 left-0 w-full h-full"
              animate={{
                opacity: [1, 0.5, 1],
                filter: [
                  "drop-shadow(0 0 8px rgba(250, 204, 21, 0.5))",
                  "drop-shadow(0 0 15px rgba(250, 204, 21, 0.8))",
                  "drop-shadow(0 0 8px rgba(250, 204, 21, 0.5))",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
            >
              <Crown className="h-20 w-20 text-yellow-400" strokeWidth={1.5} />
            </motion.div>
            <motion.div
              className="absolute -top-1 -right-1"
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-yellow-300" />
            </motion.div>
          </div>
        </motion.div>

        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-gradient">Amira</span>
        </motion.h1>

        <motion.p
          className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          The most beautiful princess in my heart
        </motion.p>
      </div>

      {/* Love message card */}
      <motion.div
        className="w-full max-w-md z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <Card className="border-blue-500/20 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-red-500/10 backdrop-blur-sm shadow-xl">
          <CardContent className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMessageIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="text-center"
              >
                <p className="text-xl md:text-2xl italic">
                  "{loveMessages[currentMessageIndex]}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center gap-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-pink-500/30 hover:bg-pink-500/10"
                onClick={() => setShowHearts(!showHearts)}
              >
                <Heart
                  className={`h-5 w-5 transition-colors duration-300 ${
                    showHearts ? "text-pink-500 fill-pink-500" : "text-pink-500"
                  }`}
                />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-blue-500/30 hover:bg-blue-500/10"
              >
                <Music className="h-5 w-5 text-blue-500" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-purple-500/30 hover:bg-purple-500/10"
              >
                <Star className="h-5 w-5 text-purple-500" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Floating decoration elements */}
      <motion.div
        className="absolute bottom-10 left-10 opacity-50 z-0"
        animate={{
          y: [0, -15, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Heart
          className="h-16 w-16 text-pink-400"
          fill="rgba(244, 114, 182, 0.2)"
        />
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 opacity-50 z-0"
        animate={{
          y: [0, 15, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1,
        }}
      >
        <Heart
          className="h-12 w-12 text-pink-300"
          fill="rgba(244, 114, 182, 0.1)"
        />
      </motion.div>
    </div>
  );
}
