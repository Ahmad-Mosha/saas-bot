"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, MinusCircle, Send, Sparkles, UserCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Message = {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
};

const DEMO_RESPONSES: Record<string, string> = {
  default:
    "I'm here to help! You can ask me about your product, provide customer support, or engage with your website visitors.",
  hello: "Hello! I'm your AI-powered chatbot. How can I assist you today?",
  help: "I can help with product information, technical support, or answer any questions about your services. Just let me know what you need!",
  pricing:
    "We offer several plans starting at $0/month for our free tier. Our pro plan is $29/month and includes premium features like custom theming and topic control.",
  features:
    "Our platform lets you easily integrate AI chatbots with no coding required. You can customize the appearance, control what topics your bot discusses, and deploy in minutes!",
  integration:
    "Integration is simple! Once you've configured your chatbot, just add a single line of JavaScript to your website to get started.",
  customization:
    "You can customize everything from colors and fonts to the bot's personality and knowledge base. Make it truly represent your brand!",
};

const getDemoResponse = (message: string): string => {
  const lowerMessage = message.toLowerCase();

  if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
    return DEMO_RESPONSES.hello;
  } else if (
    lowerMessage.includes("help") ||
    lowerMessage.includes("support")
  ) {
    return DEMO_RESPONSES.help;
  } else if (
    lowerMessage.includes("price") ||
    lowerMessage.includes("cost") ||
    lowerMessage.includes("plan")
  ) {
    return DEMO_RESPONSES.pricing;
  } else if (lowerMessage.includes("feature") || lowerMessage.includes("do")) {
    return DEMO_RESPONSES.features;
  } else if (
    lowerMessage.includes("integration") ||
    lowerMessage.includes("install") ||
    lowerMessage.includes("add")
  ) {
    return DEMO_RESPONSES.integration;
  } else if (
    lowerMessage.includes("custom") ||
    lowerMessage.includes("personal") ||
    lowerMessage.includes("brand")
  ) {
    return DEMO_RESPONSES.customization;
  }

  return DEMO_RESPONSES.default;
};

export function ChatDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hi there! 👋 I'm your ChatBot.ai assistant. Ask me anything about our chatbot integration service!",
      isBot: true,
      timestamp: new Date(),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isBotTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    // Show bot typing indicator
    setIsBotTyping(true);

    // Simulate bot thinking and typing
    setTimeout(() => {
      const botResponse = getDemoResponse(userMessage.content);

      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        content: botResponse,
        isBot: true,
        timestamp: new Date(),
      };

      setIsBotTyping(false);
      setMessages((prev) => [...prev, botMessage]);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSendMessage();
    }
  };

  const minimizeVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 20, scale: 0.8 },
  };

  const chatVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
  };

  const messageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="w-80 sm:w-96 h-[500px] max-h-[calc(100vh-120px)] flex flex-col rounded-xl overflow-hidden shadow-2xl border border-blue-500/20 animate-border-glow bg-card/80 backdrop-blur-lg"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={chatVariants}
            transition={{ duration: 0.2 }}
          >
            {/* Chat Header */}
            <div className="flex items-center justify-between bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">ChatBot.ai</h3>
                  <p className="text-xs text-white/70">Online • Demo Mode</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <MinusCircle className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-6 h-6 rounded-full text-white/70 hover:text-white hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-background/30 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.isBot ? "justify-start" : "justify-end"
                    )}
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.2 }}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-xl p-3",
                        message.isBot
                          ? "bg-card/80 border border-blue-500/10 text-foreground rounded-tl-none"
                          : "bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white rounded-tr-none"
                      )}
                    >
                      <div className="flex items-center mb-1 gap-1.5">
                        {message.isBot ? (
                          <>
                            <Bot className="w-3.5 h-3.5 text-blue-400" />
                            <span className="text-xs font-medium text-blue-400">
                              ChatBot.ai
                            </span>
                          </>
                        ) : (
                          <>
                            <UserCircle className="w-3.5 h-3.5 text-white/70" />
                            <span className="text-xs font-medium text-white/70">
                              You
                            </span>
                          </>
                        )}
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                  </motion.div>
                ))}

                {isBotTyping && (
                  <motion.div
                    className="flex justify-start"
                    variants={messageVariants}
                    initial="initial"
                    animate="animate"
                    transition={{ duration: 0.2 }}
                  >
                    <div className="max-w-[80%] rounded-xl p-4 bg-card/80 border border-blue-500/10 text-foreground rounded-tl-none">
                      <div className="flex items-center mb-2 gap-1.5">
                        <Bot className="w-3.5 h-3.5 text-blue-400" />
                        <span className="text-xs font-medium text-blue-400">
                          ChatBot.ai
                        </span>
                      </div>
                      <div className="flex space-x-1">
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400/70 animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-purple-400/70 animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        />
                        <div
                          className="w-2 h-2 rounded-full bg-pink-400/70 animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </AnimatePresence>
            </div>

            {/* Chat Input */}
            <div className="p-2 border-t border-blue-500/20 bg-card/50">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  placeholder="Type your message..."
                  className="pr-10 bg-card/30 border-blue-500/20 focus-visible:ring-blue-500/30"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <Button
                  size="icon"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 bg-blue-500/80 hover:bg-blue-500"
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="mt-2 flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Powered by <span className="text-blue-400">ChatBot.ai</span>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 rounded text-muted-foreground hover:text-foreground"
                  >
                    <Sparkles className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            className="mt-4 w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg hover:shadow-blue-500/20 hover:scale-105 transition-all duration-200"
            onClick={() => setIsOpen(true)}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={minimizeVariants}
            transition={{ duration: 0.2 }}
          >
            <Bot className="w-6 h-6 text-white" />
          </motion.button>
        ) : (
          <motion.button
            className="mt-4 p-2 rounded-full bg-gray-700/80 backdrop-blur-lg border border-blue-500/20 flex items-center gap-2 shadow-lg"
            onClick={() => setIsOpen(false)}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={minimizeVariants}
            transition={{ duration: 0.2 }}
          >
            <MinusCircle className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-white">Minimize</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
