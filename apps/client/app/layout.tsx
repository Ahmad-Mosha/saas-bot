import "./globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/context/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "ChatBot.ai - Effortless Chatbot Integration",
  description:
    "Integrate custom AI chatbots into your website or app in minutes with no coding required.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          storageKey="chatbot-theme"
        >
          <AuthProvider>
            <div className="relative min-h-screen overflow-hidden">
              {/* Dark mode background with animated gradients */}
              <div className="fixed inset-0 -z-10 overflow-hidden bg-black dark:block hidden">
                {/* Animated gradient orbs */}
                <div className="absolute -top-40 -right-20 h-[30rem] w-[30rem] rounded-full bg-indigo-600/20 blur-[100px] animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 -left-20 h-[25rem] w-[25rem] rounded-full bg-blue-600/20 blur-[100px] animate-blob animation-delay-4000"></div>
                <div className="absolute bottom-40 right-20 h-[25rem] w-[25rem] rounded-full bg-purple-600/20 blur-[100px] animate-blob"></div>
                <div className="absolute -bottom-40 left-20 h-[30rem] w-[30rem] rounded-full bg-pink-600/20 blur-[100px] animate-blob animation-delay-3000"></div>
                {/* Fine dot pattern */}
                <div className="absolute inset-0 bg-dot-pattern opacity-20"></div>
                {/* Grid overlay */}
                <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,transparent,white)]"></div>
              </div>
              {/* Light mode background - extremely simple */}
              <div className="fixed inset-0 -z-10 overflow-hidden bg-white block dark:hidden">
                {/* Simple gradient background */}
                <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50"></div>
                {/* Extremely subtle grid - barely visible */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.01) 1px, transparent 1px),
                                     linear-gradient(to bottom, rgba(0, 0, 0, 0.01) 1px, transparent 1px)`,
                    backgroundSize: "80px 80px",
                  }}
                ></div>
              </div>
              {children}
            </div>
            {/* Toast notifications */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
