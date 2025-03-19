"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bot,
  BellDot,
  Bell,
  ChevronDown,
  Search,
  Menu,
  X,
  User,
  LogOut,
  Settings,
  Sparkles,
  MessageSquare,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface HeaderProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onSidebarToggle?: () => void;
  notificationCount?: number;
}

export function Header({
  user,
  onSidebarToggle,
  notificationCount = 0,
}: HeaderProps) {
  const [showSearchMobile, setShowSearchMobile] = useState(false);
  const pathname = usePathname();

  // Extract the current section from the path
  const getActiveSection = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.length > 1 ? segments[1] : "dashboard";
  };

  const activeSection = getActiveSection();

  // Only show title on main sections
  const showTitle = pathname.split("/").filter(Boolean).length < 3;

  const sectionTitles: Record<string, string> = {
    dashboard: "Dashboard",
    analytics: "Analytics",
    chatbots: "Chatbots",
    training: "Training",
    integrations: "Integrations",
    profile: "Profile",
    settings: "Settings",
  };

  const sectionTitle = sectionTitles[activeSection] || "Dashboard";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:justify-between">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onSidebarToggle}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </Button>

        {/* Global search */}
        <div className="hidden md:flex md:w-1/3 lg:w-1/4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="relative w-full">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search across all chatbots..."
                    className="w-full pl-8 bg-background"
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Search for chatbots, messages, and more</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* User dropdown and notifications */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Upgrade Button */}
          <Link href="/dashboard/billing">
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex items-center gap-1 text-xs border-blue-500/20 bg-gradient-to-r from-blue-500/5 to-purple-500/5 hover:from-blue-500/10 hover:to-purple-500/10"
            >
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>Upgrade</span>
            </Button>
          </Link>

          {/* Notifications */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                {notificationCount > 0 ? (
                  <>
                    <BellDot className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-red-500 text-white text-[10px]">
                      {notificationCount}
                    </Badge>
                  </>
                ) : (
                  <Bell className="h-5 w-5" />
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-4">Notifications</h2>
                {notificationCount > 0 ? (
                  <div className="space-y-4">
                    {[...Array(notificationCount)].map((_, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-lg border border-blue-500/20 bg-card"
                      >
                        <div className="flex items-start gap-3">
                          <div className="h-8 w-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                            <Bot className="h-4 w-4 text-blue-500" />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              Chatbot Update
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Your chatbot has been trained successfully
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              2 hours ago
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-sm">
                    No new notifications
                  </p>
                )}
              </div>
            </SheetContent>
          </Sheet>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.avatar || "https://github.com/shadcn.png"}
                    alt={user?.name || "User"}
                  />
                  <AvatarFallback>
                    <User className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user?.name || "User Name"}
                  </p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "user@example.com"}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
