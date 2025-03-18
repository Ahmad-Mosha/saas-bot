"use client";

import { useState, useEffect } from "react";
import {
  ArrowRight,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  LineChart,
  MessageSquare,
  RefreshCw,
  ThumbsUp,
  Trash,
  Users,
  Info,
  Clock,
  TrendingUp,
  BrainCircuit,
  PieChart,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/components/theme-provider";

import { DashboardLayout } from "@/components/dashboard/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart as RechartsLineChart,
  Line,
} from "recharts";

// Sample data for charts
const conversationData = [
  { day: "Mon", conversations: 120, resolved: 110, avgResponseTime: 8 },
  { day: "Tue", conversations: 150, resolved: 140, avgResponseTime: 7 },
  { day: "Wed", conversations: 190, resolved: 175, avgResponseTime: 6 },
  { day: "Thu", conversations: 210, resolved: 190, avgResponseTime: 5 },
  { day: "Fri", conversations: 250, resolved: 230, avgResponseTime: 4 },
  { day: "Sat", conversations: 180, resolved: 170, avgResponseTime: 6 },
  { day: "Sun", conversations: 140, resolved: 135, avgResponseTime: 7 },
];

const topicData = [
  { name: "Product Inquiries", value: 35, color: "#3b82f6" },
  { name: "Technical Support", value: 25, color: "#8b5cf6" },
  { name: "Pricing", value: 20, color: "#ec4899" },
  { name: "Features", value: 15, color: "#10b981" },
  { name: "Other", value: 5, color: "#f97316" },
];

const satisfactionData = [
  { name: "Very Satisfied", value: 55, color: "#10b981" },
  { name: "Satisfied", value: 30, color: "#3b82f6" },
  { name: "Neutral", value: 10, color: "#f97316" },
  { name: "Unsatisfied", value: 5, color: "#ef4444" },
];

const userMetricsData = [
  { month: "Jan", newUsers: 150, activeUsers: 120 },
  { month: "Feb", newUsers: 200, activeUsers: 180 },
  { month: "Mar", newUsers: 250, activeUsers: 220 },
  { month: "Apr", newUsers: 300, activeUsers: 270 },
  { month: "May", newUsers: 350, activeUsers: 310 },
  { month: "Jun", newUsers: 400, activeUsers: 380 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

// Stats cards data
const statsCards = [
  {
    title: "Total Conversations",
    value: "1,240",
    change: "+14.5%",
    icon: <MessageSquare className="h-6 w-6 text-blue-400" />,
    description: "vs. last period",
    trend: "up",
  },
  {
    title: "Avg. Response Time",
    value: "6.2s",
    change: "-22.4%",
    icon: <Clock className="h-6 w-6 text-purple-400" />,
    description: "vs. last period",
    trend: "down",
  },
  {
    title: "User Satisfaction",
    value: "92%",
    change: "+3.2%",
    icon: <ThumbsUp className="h-6 w-6 text-pink-400" />,
    description: "positive ratings",
    trend: "up",
  },
  {
    title: "Active Users",
    value: "8,432",
    change: "+18.7%",
    icon: <Users className="h-6 w-6 text-green-400" />,
    description: "monthly active",
    trend: "up",
  },
];

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [timePeriod, setTimePeriod] = useState("This Week");
  const [showDataInfo, setShowDataInfo] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { theme } = useTheme();
  const [chartTheme, setChartTheme] = useState({
    axisColor: "#888",
    gridColor: "#333",
    tooltipBg: "rgba(30, 30, 30, 0.9)",
    tooltipBorder: "#444",
  });

  // Function to simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  // Update chart theme based on the app theme
  useEffect(() => {
    if (theme === "light") {
      setChartTheme({
        axisColor: "#555",
        gridColor: "#ddd",
        tooltipBg: "rgba(255, 255, 255, 0.95)",
        tooltipBorder: "#ccc",
      });
    } else {
      setChartTheme({
        axisColor: "#888",
        gridColor: "#333",
        tooltipBg: "rgba(30, 30, 30, 0.95)",
        tooltipBorder: "#444",
      });
    }
  }, [theme]);

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-8">
        {/* Data Collection Information */}
        <AnimatePresence>
          {showDataInfo && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Alert className="bg-blue-500/10 border border-blue-500/20">
                <Info className="h-4 w-4 text-blue-400" />
                <AlertTitle className="text-blue-400">
                  About Analytics Data Collection
                </AlertTitle>
                <AlertDescription className="text-sm">
                  <p className="mb-2">
                    This dashboard displays data collected through our
                    JavaScript widget that you can embed in your website.
                    Without requiring database access, our script collects
                    conversation metrics, user engagement, and satisfaction
                    ratings.
                  </p>
                  <button
                    onClick={() => setShowDataInfo(false)}
                    className="ml-2 text-blue-400 hover:underline"
                  >
                    Dismiss
                  </button>
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header and Time Period Selection */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Monitor performance and user engagement of your chatbots
            </p>
          </div>
          <div className="flex items-center gap-4 w-full md:w-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-blue-500/20">
                  <Calendar className="mr-2 h-4 w-4" />
                  {timePeriod}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTimePeriod("Today")}>
                  Today
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimePeriod("This Week")}>
                  This Week
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTimePeriod("This Month")}>
                  This Month
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setTimePeriod("Last 3 Months")}
                >
                  Last 3 Months
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="outline"
              className="border-blue-500/20"
              onClick={refreshData}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:opacity-90 transition-opacity">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Dashboard Tabs */}
        <Tabs
          defaultValue="overview"
          className="w-full"
          onValueChange={setActiveTab}
        >
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="overview">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="conversations">
              <MessageSquare className="h-4 w-4 mr-2" />
              Conversations
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="topics">
              <BrainCircuit className="h-4 w-4 mr-2" />
              Topics
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab Content */}
          <TabsContent value="overview">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-8"
            >
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsCards.map((stat, i) => (
                  <motion.div
                    key={stat.title}
                    variants={itemVariants}
                    transition={{ delay: i * 0.1 }}
                  >
                    <Card className="border border-blue-500/10 hover:border-blue-500/30 transition-all duration-300 hover:shadow-md">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-sm font-medium">
                          {stat.title}
                        </CardTitle>
                        {stat.icon}
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                          <span
                            className={
                              stat.trend === "up"
                                ? "text-green-500 flex items-center"
                                : "text-red-500 flex items-center"
                            }
                          >
                            {stat.trend === "up" ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <ArrowRight className="h-3 w-3 mr-1 -rotate-45" />
                            )}
                            {stat.change}
                          </span>
                          <span>{stat.description}</span>
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Main Chart */}
              <motion.div variants={itemVariants}>
                <Card className="border border-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <LineChart className="h-5 w-5 mr-2 text-blue-400" />
                      Conversation Metrics
                    </CardTitle>
                    <CardDescription>
                      Track user engagement over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[350px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                          data={conversationData}
                          margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                          }}
                        >
                          <defs>
                            <linearGradient
                              id="colorConversations"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#3b82f6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#3b82f6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                            <linearGradient
                              id="colorResolved"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#8b5cf6"
                                stopOpacity={0.8}
                              />
                              <stop
                                offset="95%"
                                stopColor="#8b5cf6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={chartTheme.gridColor}
                            opacity={0.2}
                          />
                          <XAxis dataKey="day" stroke={chartTheme.axisColor} />
                          <YAxis stroke={chartTheme.axisColor} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="conversations"
                            stroke="#3b82f6"
                            fillOpacity={1}
                            fill="url(#colorConversations)"
                          />
                          <Area
                            type="monotone"
                            dataKey="resolved"
                            stroke="#8b5cf6"
                            fillOpacity={1}
                            fill="url(#colorResolved)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Bottom Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div variants={itemVariants}>
                  <Card className="border border-blue-500/10">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <PieChart className="h-5 w-5 mr-2 text-pink-400" />
                        Topic Distribution
                      </CardTitle>
                      <CardDescription>Most discussed topics</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RechartsPieChart>
                            <Pie
                              data={topicData}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }) =>
                                `${name}: ${(percent * 100).toFixed(0)}%`
                              }
                              outerRadius={80}
                              innerRadius={40}
                              fill="#8884d8"
                              dataKey="value"
                              animationBegin={200}
                              animationDuration={1500}
                            >
                              {topicData.map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={entry.color}
                                />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: chartTheme.tooltipBg,
                                border: `1px solid ${chartTheme.tooltipBorder}`,
                                borderRadius: "8px",
                              }}
                            />
                          </RechartsPieChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <motion.div variants={itemVariants}>
                  <Card className="border border-blue-500/10">
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-green-400" />
                        Response Times
                      </CardTitle>
                      <CardDescription>Average response times</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={conversationData}>
                            <CartesianGrid
                              strokeDasharray="3 3"
                              stroke={chartTheme.gridColor}
                              opacity={0.2}
                            />
                            <XAxis
                              dataKey="day"
                              stroke={chartTheme.axisColor}
                            />
                            <YAxis stroke={chartTheme.axisColor} />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: chartTheme.tooltipBg,
                                border: `1px solid ${chartTheme.tooltipBorder}`,
                                borderRadius: "8px",
                              }}
                            />
                            <Bar
                              dataKey="avgResponseTime"
                              fill="#10b981"
                              barSize={30}
                              radius={[4, 4, 0, 0]}
                            />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          </TabsContent>

          {/* Conversations Tab Content */}
          <TabsContent value="conversations">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Card className="border border-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="h-5 w-5 mr-2 text-blue-400" />
                      Conversation Trend Analysis
                    </CardTitle>
                    <CardDescription>
                      Detailed view of conversation metrics over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsLineChart
                          data={conversationData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 10,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={chartTheme.gridColor}
                            opacity={0.2}
                          />
                          <XAxis dataKey="day" stroke={chartTheme.axisColor} />
                          <YAxis stroke={chartTheme.axisColor} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="conversations"
                            stroke="#3b82f6"
                            activeDot={{ r: 8 }}
                            strokeWidth={2}
                            animationDuration={1500}
                          />
                          <Line
                            type="monotone"
                            dataKey="resolved"
                            stroke="#ec4899"
                            strokeWidth={2}
                            animationDuration={1500}
                            animationBegin={300}
                          />
                        </RechartsLineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card className="border border-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <ThumbsUp className="h-5 w-5 mr-2 text-green-400" />
                      User Satisfaction
                    </CardTitle>
                    <CardDescription>
                      Breakdown of user satisfaction ratings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={satisfactionData}
                            cx="50%"
                            cy="50%"
                            labelLine={true}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            animationBegin={200}
                            animationDuration={1500}
                          >
                            {satisfactionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Users Tab Content */}
          <TabsContent value="users">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Card className="border border-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Users className="h-5 w-5 mr-2 text-purple-400" />
                      User Growth & Retention
                    </CardTitle>
                    <CardDescription>
                      New vs active users over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={userMetricsData}
                          margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke={chartTheme.gridColor}
                            opacity={0.2}
                          />
                          <XAxis
                            dataKey="month"
                            stroke={chartTheme.axisColor}
                          />
                          <YAxis stroke={chartTheme.axisColor} />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "8px",
                            }}
                          />
                          <Legend />
                          <Bar
                            dataKey="newUsers"
                            name="New Users"
                            fill="#3b82f6"
                            radius={[4, 4, 0, 0]}
                          />
                          <Bar
                            dataKey="activeUsers"
                            name="Active Users"
                            fill="#8b5cf6"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          {/* Topics Tab Content */}
          <TabsContent value="topics">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.div variants={itemVariants}>
                <Card className="border border-blue-500/10">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <BrainCircuit className="h-5 w-5 mr-2 text-pink-400" />
                      Topic Analysis
                    </CardTitle>
                    <CardDescription>
                      Detailed breakdown of conversation topics
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={topicData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            innerRadius={60}
                            fill="#8884d8"
                            paddingAngle={5}
                            dataKey="value"
                            label={({ name, percent }) =>
                              `${name}: ${(percent * 100).toFixed(0)}%`
                            }
                            labelLine={true}
                            animationBegin={200}
                            animationDuration={1500}
                          >
                            {topicData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip
                            contentStyle={{
                              backgroundColor: chartTheme.tooltipBg,
                              border: `1px solid ${chartTheme.tooltipBorder}`,
                              borderRadius: "8px",
                            }}
                          />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                      {topicData.map((topic) => (
                        <div
                          key={topic.name}
                          className="flex items-center gap-2 p-2 rounded-md border border-blue-500/10"
                        >
                          <div
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: topic.color }}
                          />
                          <span className="text-sm">{topic.name}</span>
                          <Badge className="ml-auto">{topic.value}%</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
