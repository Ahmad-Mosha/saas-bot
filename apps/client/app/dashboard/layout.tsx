"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/dashboard/Header";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { cn } from "@/lib/utils";

// Import auth-related components
import { ProtectedRoute } from "@/components/auth/protected-route";
import { useAuth } from "@/context/auth-context";
import { UserDisplayInfo } from "@/types/auth";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Get real user data from auth context
  const { user, logout } = useAuth();

  // Handle window resize
  useEffect(() => {
    const checkSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth < 1024) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    // Initial check
    checkSize();
    // Add event listener
    window.addEventListener("resize", checkSize);
    // Cleanup
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [pathname, isMobile]);

  // Convert User to UserDisplayInfo
  const userDisplayInfo: UserDisplayInfo | undefined = user
    ? {
        username: user.username,
        email: user.email,
        avatar: user.avatar,
      }
    : undefined;

  return (
    <ProtectedRoute>
      <div className="flex h-screen w-full overflow-hidden bg-background">
        {/* Sidebar */}
        <Sidebar
          collapsed={!sidebarOpen}
          user={userDisplayInfo}
          onLogout={logout}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          <Header
            user={userDisplayInfo}
            onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
            notificationCount={3}
            onLogout={logout}
          />
          <main className={cn("flex-1 overflow-auto p-4")}>
            <div className="mx-auto w-full max-w-6xl">{children}</div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
