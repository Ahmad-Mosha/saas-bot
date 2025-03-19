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
  Zap,
  ArrowUpRight,
  BarChart3,
  Clock,
  Sparkle,
  Info,
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
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChatbotCard } from "@/components/dashboard/ChatbotCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataCard } from "@/components/dashboard/DataCard";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";

// Mock data - would come from API in a real app
const mockChatbots = [
  {
    id: "1",
    name: "Customer Support Bot",
    description: "24/7 customer service chatbot",
    status: "active" as const,
    type: "text" as const,
    createDate: new Date(2023, 6, 15),
    updateDate: new Date(2023, 11, 2),
    stats: {
      users: 1243,
      messages: 8945,
      avgResponseTime: 1.2,
      avgRating: 4.7,
    },
  },
  {
    id: "2",
    name: "Marketing Assistant",
    description: "Helps with marketing campaigns",
    status: "draft" as const,
    type: "text" as const,
    createDate: new Date(2023, 9, 25),
    updateDate: new Date(2023, 10, 15),
    stats: {
      users: 385,
      messages: 2156,
      avgResponseTime: 1.5,
      avgRating: 4.3,
    },
  },
  {
    id: "3",
    name: "Sales Helper",
    description: "Assists with sales inquiries",
    status: "archived" as const,
    type: "text" as const,
    createDate: new Date(2023, 8, 10),
    updateDate: new Date(2023, 8, 10),
    stats: {
      users: 0,
      messages: 124,
      avgResponseTime: 2.1,
      avgRating: 3.8,
    },
  },
];

const lineChartData = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "Users",
      data: [120, 150, 180, 250, 300, 280, 350, 400, 450, 520, 580, 650],
    },
  ],
};

const barChartData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Messages",
      data: [350, 410, 520, 480, 390, 240, 280],
    },
  ],
};

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

  const stats = [
    {
      title: "Total Users",
      value: "2,310",
      icon: Users,
      change: "+12%",
      positive: true,
    },
    {
      title: "Total Messages",
      value: "14,478",
      icon: MessageSquare,
      change: "+24%",
      positive: true,
    },
    {
      title: "Avg. Satisfaction",
      value: "4.6",
      icon: PieChart,
      change: "+0.2",
      positive: true,
    },
    {
      title: "Active Bots",
      value: "3",
      icon: Bot,
      change: "0",
      positive: null,
    },
  ];

  const [timeRange, setTimeRange] = useState("30d");
  const [chartType, setChartType] = useState("line");

  return (
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
        {stats.map((stat, i) => (
          <StatsCard
            key={i}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            positive={stat.positive}
          />
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
                  in minutes. Choose from text or image generation capabilities,
                  customize the appearance, and deploy it to your website with a
                  single click.
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

      {/* Analytics Section */}
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between pb-3">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="chatbots">Chatbots</TabsTrigger>
          </TabsList>
          <Link href="/dashboard/analytics">
            <Button variant="ghost" size="sm" className="gap-1">
              <span>View Detailed Analytics</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <TabsContent value="overview" className="space-y-4">
          <Card className="bg-muted/50 border-blue-500/20">
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                <Info className="h-4 w-4" />
                <p>
                  This is a simplified overview. Visit the{" "}
                  <Link
                    href="/dashboard/analytics"
                    className="text-blue-500 hover:underline"
                  >
                    Analytics page
                  </Link>{" "}
                  for more detailed reports, charts, and filters.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <AnalyticsChart
              title="User Growth"
              icon={Users}
              timeRanges={[
                { value: "7d", label: "7 Days" },
                { value: "30d", label: "30 Days" },
                { value: "90d", label: "90 Days" },
              ]}
              defaultTimeRange={timeRange}
              chartTypes={[
                { value: "line", label: "Line" },
                { value: "bar", label: "Bar" },
              ]}
              defaultChartType={chartType}
              data={lineChartData}
              onTimeRangeChange={setTimeRange}
              onChartTypeChange={setChartType}
            />
            <AnalyticsChart
              title="Message Volume"
              icon={MessageSquare}
              timeRanges={[
                { value: "7d", label: "7 Days" },
                { value: "30d", label: "30 Days" },
                { value: "90d", label: "90 Days" },
              ]}
              defaultTimeRange={timeRange}
              chartTypes={[
                { value: "line", label: "Line" },
                { value: "bar", label: "Bar" },
              ]}
              defaultChartType="bar"
              data={barChartData}
              onTimeRangeChange={setTimeRange}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Response Time
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1.4s</div>
                <p className="text-xs text-muted-foreground">
                  -0.3s from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Successful Responses
                </CardTitle>
                <Sparkle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">94.2%</div>
                <p className="text-xs text-muted-foreground">
                  +2.4% from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Avg. Session Length
                </CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4m 32s</div>
                <p className="text-xs text-muted-foreground">
                  +45s from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  User Satisfaction
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6/5</div>
                <p className="text-xs text-muted-foreground">
                  +0.3 from last month
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Analytics Overview</CardTitle>
              <CardDescription>
                Detailed metrics about your chatbot performance
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <AnalyticsChart
                title=""
                icon={BarChart3}
                timeRanges={[
                  { value: "7d", label: "7 Days" },
                  { value: "30d", label: "30 Days" },
                  { value: "90d", label: "90 Days" },
                  { value: "1y", label: "1 Year" },
                ]}
                defaultTimeRange={timeRange}
                chartTypes={[
                  { value: "line", label: "Line" },
                  { value: "bar", label: "Bar" },
                ]}
                defaultChartType={chartType}
                data={lineChartData}
                height={350}
                onTimeRangeChange={setTimeRange}
                onChartTypeChange={setChartType}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="chatbots" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockChatbots.map((chatbot) => (
              <ChatbotCard
                key={chatbot.id}
                data={chatbot}
                onStatusChange={(id, status) => console.log(id, status)}
                onDelete={(id) => console.log("Delete", id)}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/dashboard/chatbots">
              <Button variant="outline">View All Chatbots</Button>
            </Link>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
