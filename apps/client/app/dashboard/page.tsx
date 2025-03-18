"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  ChevronRight,
  LineChart,
  MessageSquare,
  PieChart,
  Plus,
  Search,
  Settings,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DashboardLayout } from "@/components/dashboard/layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function DashboardPage() {
  const [activeChatbots, setActiveChatbots] = useState([
    {
      id: 1,
      name: "Customer Support Bot",
      description: "24/7 customer support assistant",
      status: "active",
      users: 1248,
      messages: 8752,
      lastUpdated: "2h ago",
      averageRating: 4.8,
    },
    {
      id: 2,
      name: "Product Advisor",
      description: "Helps customers find the right products",
      status: "active",
      users: 843,
      messages: 4521,
      lastUpdated: "Yesterday",
      averageRating: 4.5,
    },
    {
      id: 3,
      name: "FAQ Assistant",
      description: "Answers common questions about our services",
      status: "maintenance",
      users: 219,
      messages: 1205,
      lastUpdated: "3d ago",
      averageRating: 4.2,
    },
  ]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Header and Search */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and monitor your chatbots
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="pl-8 bg-background w-full"
              />
            </div>
            <Link href="/dashboard/builder">
              <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
                <Plus className="mr-2 h-4 w-4" /> New Chatbot
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Total Users",
              value: "2,310",
              icon: <Users className="h-5 w-5 text-blue-400" />,
              change: "+12%",
              positive: true,
            },
            {
              title: "Total Messages",
              value: "14,478",
              icon: <MessageSquare className="h-5 w-5 text-purple-400" />,
              change: "+24%",
              positive: true,
            },
            {
              title: "Avg. Satisfaction",
              value: "4.6",
              icon: <PieChart className="h-5 w-5 text-pink-400" />,
              change: "+0.2",
              positive: true,
            },
            {
              title: "Active Bots",
              value: "3",
              icon: <Bot className="h-5 w-5 text-green-400" />,
              change: "0",
              positive: null,
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="border-blue-500/20 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-muted-foreground text-sm">
                      {stat.title}
                    </span>
                    <div className="flex items-baseline gap-2 mt-1">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      {stat.change && (
                        <span
                          className={`text-xs font-medium ${
                            stat.positive === null
                              ? "text-muted-foreground"
                              : stat.positive
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {stat.change}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    {stat.icon}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bot Builder Promotion Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-blue-500/20 overflow-hidden">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-30" />
              <CardContent className="p-6 lg:p-8 flex flex-col lg:flex-row items-center gap-6">
                <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 100,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute w-full h-full rounded-full border-t-2 border-white opacity-20"
                  />
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
                  >
                    <Bot className="w-12 h-12 lg:w-16 lg:h-16 text-white" />
                  </motion.div>
                </div>

                <div className="flex-1 text-center lg:text-left">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl font-bold mb-2"
                  >
                    Build Your Custom AI Bot
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground mb-4 max-w-3xl"
                  >
                    Create a powerful AI chatbot tailored to your specific needs
                    in minutes. Choose from text or image generation
                    capabilities, customize the appearance, and deploy it to
                    your website with a single click.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <Link href="/dashboard/builder">
                      <Button
                        size="lg"
                        className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity"
                      >
                        Create New Bot <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </CardContent>
            </div>
          </Card>
        </motion.div>

        {/* Active Chatbots */}
        <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Chatbots</CardTitle>
                <CardDescription>
                  Manage and monitor all your active chatbots
                </CardDescription>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-blue-500/20">
                    Sort By: Recent <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>Recent</DropdownMenuItem>
                  <DropdownMenuItem>Most Active</DropdownMenuItem>
                  <DropdownMenuItem>Highest Rated</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>Status: All</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="divide-y divide-blue-500/10">
              {activeChatbots.map((bot) => (
                <div
                  key={bot.id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 py-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                      <AvatarImage
                        src={`https://avatar.vercel.sh/bot-${bot.id}?size=40`}
                      />
                      <AvatarFallback>
                        <Bot className="h-5 w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{bot.name}</h3>
                        <Badge
                          variant={
                            bot.status === "active" ? "default" : "outline"
                          }
                          className={`${
                            bot.status === "active"
                              ? "bg-green-500/10 text-green-500 hover:bg-green-500/20"
                              : "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
                          }`}
                        >
                          {bot.status === "active" ? "Active" : "Maintenance"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {bot.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full md:w-auto flex-wrap gap-3 md:gap-6">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-blue-400" />
                      <span className="text-sm">
                        {bot.users.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageSquare className="h-4 w-4 text-purple-400" />
                      <span className="text-sm">
                        {bot.messages.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="flex">
                        {Array(5)
                          .fill(0)
                          .map((_, i) => (
                            <span
                              key={i}
                              className={`text-sm ${
                                i < Math.floor(bot.averageRating)
                                  ? "text-yellow-400"
                                  : "text-muted-foreground"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                      </div>
                      <span className="text-sm ml-1">{bot.averageRating}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Updated {bot.lastUpdated}
                    </div>
                    <div className="ml-auto">
                      <Link href={`/dashboard/builder/${bot.id}`}>
                        <Button
                          variant="outline"
                          className="border-blue-500/20 bg-card/50"
                        >
                          Manage <ArrowRight className="ml-2 h-3 w-3" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t border-blue-500/10 pt-6">
            <Button variant="outline" className="border-blue-500/20">
              View All Chatbots
            </Button>
          </CardFooter>
        </Card>

        {/* Quick Actions and Recent Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm md:col-span-1">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                {
                  title: "Create New Chatbot",
                  description: "Start building a new AI assistant",
                  icon: <Plus className="h-4 w-4" />,
                  href: "/dashboard/builder",
                },
                {
                  title: "View Analytics",
                  description: "See detailed performance metrics",
                  icon: <LineChart className="h-4 w-4" />,
                  href: "/dashboard/analytics",
                },
                {
                  title: "Account Settings",
                  description: "Manage your profile and preferences",
                  icon: <Settings className="h-4 w-4" />,
                  href: "/dashboard/settings",
                },
              ].map((action, i) => (
                <Link key={i} href={action.href} className="block">
                  <div className="flex items-center gap-4 p-4 rounded-lg border border-blue-500/10 hover:bg-blue-500/5 transition-colors">
                    <div className="p-2 rounded-md bg-blue-500/10 text-blue-400">
                      {action.icon}
                    </div>
                    <div>
                      <h3 className="font-medium">{action.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                    <ChevronRight className="ml-auto h-5 w-5 text-muted-foreground" />
                  </div>
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm md:col-span-2">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Latest updates and changes to your chatbots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  {
                    action: "Configuration updated",
                    subject: "Customer Support Bot",
                    time: "2 hours ago",
                    description: "You modified topic control settings",
                  },
                  {
                    action: "New integration",
                    subject: "Product Advisor",
                    time: "Yesterday",
                    description: "Connected to your Shopify store",
                  },
                  {
                    action: "Performance report",
                    subject: "All chatbots",
                    time: "3 days ago",
                    description: "Weekly analytics summary generated",
                  },
                  {
                    action: "Maintenance completed",
                    subject: "FAQ Assistant",
                    time: "3 days ago",
                    description: "Bot is now back online with improvements",
                  },
                ].map((activity, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="relative">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-2"></div>
                      {i !== 3 && (
                        <div className="absolute w-0.5 bg-blue-500/20 h-full left-1 top-3"></div>
                      )}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-1">
                        <h4 className="font-medium">{activity.action}</h4>
                        <span className="text-sm text-muted-foreground">-</span>
                        <span className="text-sm font-medium text-blue-400">
                          {activity.subject}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {activity.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t border-blue-500/10 pt-6">
              <Button variant="outline" className="w-full border-blue-500/20">
                View All Activity
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
