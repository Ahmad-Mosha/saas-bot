"use client";

import { useState } from "react";
import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Calendar as CalendarIcon,
  ChevronDown,
  Download,
  Filter,
  LineChart,
  PieChart,
  RefreshCcw,
  Users,
} from "lucide-react";
import { AnalyticsChart } from "@/components/dashboard/AnalyticsChart";
import { AnalyticsCard } from "@/components/dashboard/AnalyticsCard";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

export default function AnalyticsPage() {
  const [selectedChatbot, setSelectedChatbot] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");
  const [chartType, setChartType] = useState("line");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    to: new Date(),
  });

  // Mock data for the charts
  const usageMetricsData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "Conversations",
        data: [12, 19, 25, 16, 24, 41, 35],
        color: "rgb(37, 99, 235)",
      },
      {
        label: "Messages",
        data: [45, 59, 80, 81, 56, 85, 72],
        color: "rgb(147, 51, 234)",
      },
    ],
  };

  const userActivityData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        label: "New Users",
        data: [5, 8, 12, 7, 11, 9, 14],
        color: "rgb(16, 185, 129)",
      },
      {
        label: "Returning Users",
        data: [11, 14, 18, 15, 21, 25, 19],
        color: "rgb(239, 68, 68)",
      },
    ],
  };

  const usageBreakdownData = {
    labels: ["Website", "Mobile App", "API", "Slack", "Teams"],
    datasets: [
      {
        data: [35, 25, 20, 10, 10],
        backgroundColor: [
          "rgb(37, 99, 235)",
          "rgb(16, 185, 129)",
          "rgb(239, 68, 68)",
          "rgb(245, 158, 11)",
          "rgb(147, 51, 234)",
        ],
      },
    ],
  };

  const performanceComparisonData = {
    labels: [
      "Response Time",
      "Accuracy",
      "Completion",
      "User Rating",
      "Error Rate",
    ],
    datasets: [
      {
        label: "Current Week",
        data: [85, 90, 78, 88, 95],
        color: "rgb(37, 99, 235)",
        fill: true,
      },
      {
        label: "Previous Week",
        data: [75, 85, 70, 82, 90],
        color: "rgb(239, 68, 68)",
        fill: true,
      },
    ],
  };

  const usageTimeDistributionData = {
    labels: ["Morning", "Afternoon", "Evening", "Night"],
    datasets: [
      {
        data: [25, 40, 25, 10],
        backgroundColor: [
          "rgb(245, 158, 11)",
          "rgb(37, 99, 235)",
          "rgb(147, 51, 234)",
          "rgb(16, 185, 129)",
        ],
      },
    ],
  };

  const messageIntentData = {
    labels: ["Support", "Product Info", "Pricing", "Order Status", "Other"],
    datasets: [
      {
        data: [40, 20, 15, 15, 10],
        backgroundColor: [
          "rgb(37, 99, 235)",
          "rgb(16, 185, 129)",
          "rgb(245, 158, 11)",
          "rgb(147, 51, 234)",
          "rgb(239, 68, 68)",
        ],
      },
    ],
  };

  const feedbackAnalysisData = {
    labels: ["Excellent", "Good", "Neutral", "Needs Improvement", "Poor"],
    datasets: [
      {
        data: [35, 40, 15, 7, 3],
        backgroundColor: [
          "rgb(16, 185, 129)",
          "rgb(74, 222, 128)",
          "rgb(245, 158, 11)",
          "rgb(249, 115, 22)",
          "rgb(239, 68, 68)",
        ],
      },
    ],
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Monitor your chatbot performance and usage metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-start w-[240px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                initialFocus
                mode="range"
                selected={dateRange}
                onSelect={setDateRange as any}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>

          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <AnalyticsCard
          title="Total Conversations"
          value="1,523"
          change="+12.5%"
          trend="up"
          description="vs. previous period"
          icon={<Users />}
        />
        <AnalyticsCard
          title="Total Messages"
          value="15,875"
          change="+8.2%"
          trend="up"
          description="vs. previous period"
          icon={<BarChart3 />}
        />
        <AnalyticsCard
          title="Avg. Response Time"
          value="1.2s"
          change="-0.3s"
          trend="down"
          description="vs. previous period"
          icon={<LineChart />}
        />
        <AnalyticsCard
          title="User Satisfaction"
          value="92%"
          change="+3.5%"
          trend="up"
          description="vs. previous period"
          icon={<PieChart />}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Usage Metrics</CardTitle>
              <CardDescription>
                Conversations and messages over time
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Select value={chartType} onValueChange={setChartType}>
                <SelectTrigger className="w-[100px]">
                  <SelectValue placeholder="Chart type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="line">Line</SelectItem>
                  <SelectItem value="bar">Bar</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AnalyticsChart
                type={chartType as any}
                data={usageMetricsData}
                showLegend
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>User Activity</CardTitle>
              <CardDescription>New and returning users</CardDescription>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>All users</DropdownMenuItem>
                <DropdownMenuItem>New users</DropdownMenuItem>
                <DropdownMenuItem>Returning users</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <AnalyticsChart type="bar" data={userActivityData} showLegend />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="usage" className="space-y-4">
        <TabsList>
          <TabsTrigger value="usage">Usage Breakdown</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
          <TabsTrigger value="intents">Intents</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
        </TabsList>

        <TabsContent value="usage">
          <Card>
            <CardHeader>
              <CardTitle>Usage Breakdown</CardTitle>
              <CardDescription>
                Distribution of usage across platforms
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  type="pie"
                  data={usageBreakdownData}
                  showLegend
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Performance Comparison</CardTitle>
              <CardDescription>
                Current vs. previous week metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  type="radar"
                  data={performanceComparisonData}
                  showLegend
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time">
          <Card>
            <CardHeader>
              <CardTitle>Usage Time Distribution</CardTitle>
              <CardDescription>
                When users interact with your chatbots
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  type="doughnut"
                  data={usageTimeDistributionData}
                  showLegend
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intents">
          <Card>
            <CardHeader>
              <CardTitle>Message Intent Analysis</CardTitle>
              <CardDescription>What users are asking about</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  type="pie"
                  data={messageIntentData}
                  showLegend
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback Analysis</CardTitle>
              <CardDescription>How users rate their experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <AnalyticsChart
                  type="pie"
                  data={feedbackAnalysisData}
                  showLegend
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
