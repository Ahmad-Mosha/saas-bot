"use client";

import { useState, useEffect, useRef } from "react";
import { ChatDemo } from "@/components/chat-demo";
import { TopNavigation } from "@/components/landing/TopNavigation";
import { HeroSection } from "@/components/landing/HeroSection";
import { HowItWorksSection } from "@/components/landing/HowItWorksSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { TestimonialsSection } from "@/components/landing/TestimonialsSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { CTASection } from "@/components/landing/CTASection";
import { FooterSection } from "@/components/landing/FooterSection";
import { VideoModal } from "@/components/landing/VideoModal";

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
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Handle modal closing and video pause
  useEffect(() => {
    if (!isVideoModalOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [isVideoModalOpen]);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  return (
    <div className="min-h-screen">
      <TopNavigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <HeroSection scrollY={scrollY} openVideoModal={openVideoModal} />

      {/* Demo Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="max-w-[920px] mx-auto bg-card/50 backdrop-blur-sm border border-blue-500/20 rounded-xl overflow-hidden">
            <ChatDemo />
          </div>
        </div>
      </section>

      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <PricingSection />
      <CTASection />
      <FooterSection />

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        videoRef={videoRef}
      />
    </div>
  );
}
