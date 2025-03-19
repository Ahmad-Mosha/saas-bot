"use client";

import { useState } from "react";
import {
  Bot,
  Plus,
  Search,
  SlidersHorizontal,
  Filter,
  List,
  Grid3x3,
  DownloadCloud,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatbotCard, ChatbotStatus } from "@/components/dashboard/ChatbotCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
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
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataCard } from "@/components/dashboard/DataCard";

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
    status: "maintenance" as const,
    type: "image" as const,
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
  {
    id: "4",
    name: "Product Recommendation Bot",
    description: "Recommends products based on user preferences",
    status: "active" as const,
    type: "text" as const,
    createDate: new Date(2023, 7, 5),
    updateDate: new Date(2023, 10, 20),
    stats: {
      users: 892,
      messages: 5241,
      avgResponseTime: 1.3,
      avgRating: 4.5,
    },
  },
  {
    id: "5",
    name: "FAQ Bot",
    description: "Answers frequently asked questions",
    status: "active" as const,
    type: "text" as const,
    createDate: new Date(2023, 5, 10),
    updateDate: new Date(2023, 11, 1),
    stats: {
      users: 2103,
      messages: 15234,
      avgResponseTime: 0.8,
      avgRating: 4.9,
    },
  },
];

export default function ChatbotsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter and sort chatbots based on current filters
  const filteredChatbots = mockChatbots
    .filter((chatbot) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        chatbot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        chatbot.description.toLowerCase().includes(searchQuery.toLowerCase());

      // Status filter
      const matchesStatus =
        statusFilter === "all" || chatbot.status === statusFilter;

      // Type filter
      const matchesType = typeFilter === "all" || chatbot.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    })
    .sort((a, b) => {
      // Sort by newest/oldest
      if (sortBy === "newest") {
        return (
          new Date(b.createDate).getTime() - new Date(a.createDate).getTime()
        );
      } else if (sortBy === "oldest") {
        return (
          new Date(a.createDate).getTime() - new Date(b.createDate).getTime()
        );
      } else if (sortBy === "name-asc") {
        return a.name.localeCompare(b.name);
      } else if (sortBy === "name-desc") {
        return b.name.localeCompare(a.name);
      } else if (sortBy === "usage") {
        return b.stats.users - a.stats.users;
      }
      return 0;
    });

  // Calculate stats
  const totalChatbots = mockChatbots.length;
  const activeChatbots = mockChatbots.filter(
    (chatbot) => chatbot.status === "active"
  ).length;
  const inMaintenance = mockChatbots.filter(
    (chatbot) => chatbot.status === "maintenance"
  ).length;
  const archivedChatbots = mockChatbots.filter(
    (chatbot) => chatbot.status === "archived"
  ).length;

  // Handle status change
  const handleStatusChange = (id: string, newStatus: ChatbotStatus) => {
    console.log(`Changing status of chatbot ${id} to ${newStatus}`);
    // In a real app, this would call an API to update the status
  };

  // Handle delete
  const handleDelete = (id: string) => {
    console.log(`Deleting chatbot ${id}`);
    // In a real app, this would call an API to delete the chatbot
  };

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Chatbots</h1>
          <p className="text-muted-foreground">
            Manage and monitor your AI chatbots
          </p>
        </div>
        <Link href="/dashboard/chatbots/new">
          <Button className="w-full sm:w-auto">
            <Plus className="mr-2 h-4 w-4" />
            Create New Chatbot
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <DataCard
          title="Total Chatbots"
          value={totalChatbots.toString()}
          icon={Bot}
          description="Total chatbots created"
          variant="default"
        />
        <DataCard
          title="Active"
          value={activeChatbots.toString()}
          icon={Bot}
          description="Currently active"
          variant="success"
        />
        <DataCard
          title="Maintenance"
          value={inMaintenance.toString()}
          icon={Bot}
          description="Being trained"
          variant="warning"
        />
        <DataCard
          title="Archived"
          value={archivedChatbots.toString()}
          icon={Bot}
          description="Currently archived"
          variant="destructive"
        />
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search chatbots..."
            className="pl-8 pr-4"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="support">Support</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="sales">Sales</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="oldest">Oldest First</SelectItem>
              <SelectItem value="name-asc">Name (A-Z)</SelectItem>
              <SelectItem value="name-desc">Name (Z-A)</SelectItem>
              <SelectItem value="usage">Most Used</SelectItem>
            </SelectContent>
          </Select>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <SlidersHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>View Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => setViewMode("grid")}>
                  <Grid3x3 className="mr-2 h-4 w-4" />
                  <span>Grid View</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setViewMode("list")}>
                  <List className="mr-2 h-4 w-4" />
                  <span>List View</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <DownloadCloud className="mr-2 h-4 w-4" />
                  <span>Export Chatbots</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <div className="flex rounded-md border">
            <Button
              variant={viewMode === "grid" ? "default" : "outline"}
              className="rounded-r-none px-3 h-9"
              onClick={() => setViewMode("grid")}
            >
              <Grid3x3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "outline"}
              className="rounded-l-none px-3 h-9"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">
              All
              <Badge variant="secondary" className="ml-2">
                {totalChatbots}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="active">
              Active
              <Badge variant="secondary" className="ml-2">
                {activeChatbots}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="maintenance">
              Maintenance
              <Badge variant="secondary" className="ml-2">
                {inMaintenance}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="archived">
              Archived
              <Badge variant="secondary" className="ml-2">
                {archivedChatbots}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredChatbots.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center">
                  <Bot className="h-12 w-12 mx-auto text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">
                    No chatbots found
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    No chatbots match your current filters. Try changing your
                    search criteria.
                  </p>
                  <Button
                    className="mt-4"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setStatusFilter("all");
                      setTypeFilter("all");
                    }}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Reset Filters
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {filteredChatbots.map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    data={chatbot}
                    view={viewMode}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="active" className="space-y-4">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {mockChatbots
                .filter((chatbot) => chatbot.status === "active")
                .map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    data={chatbot}
                    view={viewMode}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {mockChatbots
                .filter((chatbot) => chatbot.status === "maintenance")
                .map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    data={chatbot}
                    view={viewMode}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="archived" className="space-y-4">
            <div
              className={
                viewMode === "grid"
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                  : "space-y-4"
              }
            >
              {mockChatbots
                .filter((chatbot) => chatbot.status === "archived")
                .map((chatbot) => (
                  <ChatbotCard
                    key={chatbot.id}
                    data={chatbot}
                    view={viewMode}
                    onStatusChange={handleStatusChange}
                    onDelete={handleDelete}
                  />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
