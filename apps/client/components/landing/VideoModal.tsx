"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { RefObject } from "react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoRef: RefObject<HTMLVideoElement>;
}

export const VideoModal = ({ isOpen, onClose, videoRef }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
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
            onClick={onClose}
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
            See how easy it is to set up your own AI-powered chatbot in minutes.
            This demo shows the complete process from configuration to
            deployment.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
