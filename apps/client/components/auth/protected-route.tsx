"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { LoadingScreen } from "../ui/loading-screen";

interface ProtectedRouteProps {
  children: ReactNode;
}

/**
 * Protected route component that restricts access to authenticated users only
 */
export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirect during SSR or when still loading auth state
    if (isLoading) return;

    // If not authenticated and not on an auth page, redirect to login
    if (!isAuthenticated) {
      // Store the attempted URL to redirect back after login
      const returnUrl = encodeURIComponent(pathname);
      router.push(`/sign-in?returnUrl=${returnUrl}`);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading state while checking auth
  if (isLoading) {
    return <LoadingScreen />;
  }

  // If authenticated or still checking, render children
  return isAuthenticated ? <>{children}</> : null;
}
