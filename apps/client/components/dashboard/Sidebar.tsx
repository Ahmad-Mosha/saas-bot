"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Bot,
  LayoutDashboard,
  BarChart,
  Database,
  Code,
  Settings,
  User,
  Menu,
  X,
  MessageSquare,
  Sparkles,
  PlusCircle,
  UserCircle,
  CreditCard,
  HelpCircle,
  LogOut,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/theme-toggle";
import { ScrollArea } from "@/components/ui/scroll-area";
import { UserDisplayInfo } from "@/types/auth";

interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
}

interface NavigationSection {
  title: string;
  items: NavigationItem[];
}

interface SidebarProps {
  user?: UserDisplayInfo;
  plan?: string;
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
  onLogout?: () => void;
}

export function Sidebar({
  user,
  plan = "Free",
  collapsed = false,
  onCollapse,
  onLogout,
}: SidebarProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(collapsed);
  const pathname = usePathname();

  // Sync the collapsed state with the parent component
  useEffect(() => {
    if (collapsed !== sidebarCollapsed) {
      setSidebarCollapsed(collapsed);
    }
  }, [collapsed]);

  // Report the collapsed state to the parent
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    onCollapse?.(!sidebarCollapsed);
  };

  // Handle logout click
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const navigation: NavigationSection[] = [
    {
      title: "Overview",
      items: [
        {
          name: "Dashboard",
          href: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          name: "Analytics",
          href: "/dashboard/analytics",
          icon: BarChart,
        },
      ],
    },
    {
      title: "Chatbots",
      items: [
        {
          name: "My Chatbots",
          href: "/dashboard/chatbots",
          icon: Bot,
          badge: 3,
        },
        {
          name: "Training",
          href: "/dashboard/training",
          icon: Database,
        },
        {
          name: "Integrations",
          href: "/dashboard/integrations",
          icon: Code,
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Profile",
          href: "/dashboard/profile",
          icon: User,
        },
        {
          name: "Settings",
          href: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ];

  return (
    <div
      className={`flex flex-col h-screen border-r border-blue-500/20 bg-background/80 backdrop-blur-sm transition-all duration-300 ${
        sidebarCollapsed ? "w-[70px]" : "w-[250px]"
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center px-4 justify-between border-b border-blue-500/20">
        <Link
          href="/dashboard"
          className={`flex items-center ${
            sidebarCollapsed ? "justify-center w-full" : "gap-2"
          }`}
        >
          <Bot className="h-6 w-6 text-blue-500" />
          {!sidebarCollapsed && (
            <span className="font-semibold">ChatBot.ai</span>
          )}
        </Link>
        {!sidebarCollapsed && (
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
            aria-label="Collapse sidebar"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <div className="mb-6">
          <Button
            className={`w-full ${
              sidebarCollapsed ? "justify-center" : "justify-start"
            } gap-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity`}
            size={sidebarCollapsed ? "icon" : "default"}
            asChild
          >
            <Link href="/dashboard/builder">
              {sidebarCollapsed ? (
                <PlusCircle className="h-4 w-4" />
              ) : (
                <>
                  <PlusCircle className="h-4 w-4" />
                  <span>New Chatbot</span>
                </>
              )}
            </Link>
          </Button>
        </div>

        {navigation.map((section, i) => (
          <div key={section.title} className={i > 0 ? "mt-6" : ""}>
            {!sidebarCollapsed && (
              <h3 className="mb-2 px-2 text-xs font-semibold text-muted-foreground">
                {section.title}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <TooltipProvider key={item.name}>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger asChild>
                        <Link
                          href={item.href}
                          className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                            isActive
                              ? "bg-blue-500/10 text-blue-500"
                              : "text-muted-foreground hover:bg-blue-500/5 hover:text-foreground"
                          } ${sidebarCollapsed ? "justify-center" : ""}`}
                        >
                          <div className="relative">
                            <item.icon
                              className={`h-5 w-5 ${
                                isActive
                                  ? "text-blue-500"
                                  : "text-muted-foreground"
                              }`}
                            />
                            {sidebarCollapsed && item.badge && (
                              <Badge className="absolute -top-2 -right-2 h-4 w-4 rounded-full p-0 text-[10px] flex items-center justify-center">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                          {!sidebarCollapsed && (
                            <span className="truncate">{item.name}</span>
                          )}
                          {!sidebarCollapsed && item.badge && (
                            <Badge className="ml-auto bg-blue-500/10 text-blue-500 hover:bg-blue-500/20">
                              {item.badge}
                            </Badge>
                          )}
                        </Link>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right">
                          {item.name}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  </TooltipProvider>
                );
              })}
            </div>
          </div>
        ))}

        {/* Add a button to expand the sidebar when collapsed */}
        {sidebarCollapsed && (
          <div className="mt-6 flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="h-8 w-8"
              aria-label="Expand sidebar"
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        )}
      </ScrollArea>

      {/* Footer - User Menu */}
      <div className="px-3 py-4 mt-auto border-t border-blue-500/20">
        {plan !== "Free" && (
          <div
            className={`mb-3 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-2 ${
              sidebarCollapsed ? "text-center" : ""
            }`}
          >
            {sidebarCollapsed ? (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Zap className="h-5 w-5 text-yellow-500 mx-auto" />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {plan} Plan Active
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-yellow-500" />
                <span className="text-xs font-medium">{plan} Plan</span>
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className={`${
                  sidebarCollapsed ? "w-10 px-0" : "w-full justify-start"
                } gap-2`}
              >
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    src={user?.avatar || "https://github.com/shadcn.png"}
                    alt={user?.username || "User"}
                  />
                  <AvatarFallback>
                    {user?.username?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
                {!sidebarCollapsed && (
                  <div className="flex flex-col items-start text-left">
                    <span className="text-xs font-medium truncate max-w-[120px]">
                      {user?.username || "User"}
                    </span>
                    <span className="text-xs text-muted-foreground truncate max-w-[120px]">
                      {user?.email || "user@example.com"}
                    </span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/dashboard/profile">
                  <UserCircle className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/billing">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/dashboard/support">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Support</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {!sidebarCollapsed && <ThemeToggle />}
        </div>
      </div>
    </div>
  );
}
