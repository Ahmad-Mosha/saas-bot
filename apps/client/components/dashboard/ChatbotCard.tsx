"use client";

import Link from "next/link";
import { format } from "date-fns";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  MessageSquare,
  Users,
  Star,
  CheckCircle2,
  Clock,
  AlertCircle,
  Bot,
  Settings,
  Copy,
  Trash,
  PauseCircle,
  PlayCircle,
  BarChart3,
  Edit,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { memo } from "react";

export type ChatbotStatus = "active" | "maintenance" | "draft" | "archived";
export type ChatbotType = "text" | "image" | "audio" | "multimodal";

export interface ChatbotData {
  id: string;
  name: string;
  description: string;
  status: ChatbotStatus;
  type: ChatbotType;
  createDate: Date;
  updateDate: Date;
  stats: {
    users: number;
    messages: number;
    avgResponseTime: number; // in ms
    avgRating: number;
    trainedPages?: number;
    maxPages?: number;
  };
  integration?: {
    active: boolean;
    sites: string[];
  };
}

interface ChatbotCardProps {
  data: ChatbotData;
  onStatusChange?: (id: string, newStatus: ChatbotStatus) => void;
  onDelete?: (id: string) => void;
  view?: "compact" | "detailed";
}

const getStatusInfo = (status: ChatbotStatus) => {
  switch (status) {
    case "active":
      return {
        label: "Active",
        color: "bg-green-500/20 text-green-500 hover:bg-green-500/30",
        icon: CheckCircle2,
      };
    case "maintenance":
      return {
        label: "Maintenance",
        color: "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30",
        icon: Clock,
      };
    case "draft":
      return {
        label: "Draft",
        color: "bg-blue-500/20 text-blue-500 hover:bg-blue-500/30",
        icon: Edit,
      };
    case "archived":
      return {
        label: "Archived",
        color: "bg-gray-500/20 text-gray-500 hover:bg-gray-500/30",
        icon: AlertCircle,
      };
  }
};

const getTypeInfo = (type: ChatbotType) => {
  switch (type) {
    case "text":
      return {
        label: "Text Bot",
        color: "bg-blue-500/10 text-blue-500",
      };
    case "image":
      return {
        label: "Image Bot",
        color: "bg-purple-500/10 text-purple-500",
      };
    case "audio":
      return {
        label: "Audio Bot",
        color: "bg-pink-500/10 text-pink-500",
      };
    case "multimodal":
      return {
        label: "Multimodal Bot",
        color:
          "bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 text-indigo-500",
      };
  }
};

export const ChatbotCard = memo(
  ({ data, onStatusChange, onDelete, view = "detailed" }: ChatbotCardProps) => {
    const {
      id,
      name,
      description,
      status,
      type,
      createDate,
      updateDate,
      stats,
      integration,
    } = data;

    const statusInfo = getStatusInfo(status);
    const typeInfo = getTypeInfo(type);
    const StatusIcon = statusInfo.icon;

    const isCompact = view === "compact";
    const hasSites = integration?.sites && integration.sites.length > 0;

    return (
      <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-md overflow-hidden">
        <CardContent className={`${isCompact ? "p-4" : "p-6"}`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Bot className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-base">{name}</h3>
                  <Badge variant="secondary" className={statusInfo.color}>
                    <StatusIcon className="mr-1 h-3 w-3" />
                    {statusInfo.label}
                  </Badge>
                  <Badge variant="outline" className={typeInfo.color}>
                    {typeInfo.label}
                  </Badge>
                </div>
                {!isCompact && (
                  <p className="text-muted-foreground text-sm mt-1 line-clamp-2">
                    {description}
                  </p>
                )}
              </div>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/chatbots/${id}/edit`}
                    className="flex items-center w-full"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/chatbots/${id}/analytics`}
                    className="flex items-center w-full"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    <span>Analytics</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    href={`/dashboard/chatbots/${id}/settings`}
                    className="flex items-center w-full"
                  >
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Copy className="mr-2 h-4 w-4" />
                  <span>Duplicate</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {status === "active" && onStatusChange && (
                  <DropdownMenuItem
                    onClick={() => onStatusChange(id, "maintenance")}
                  >
                    <PauseCircle className="mr-2 h-4 w-4 text-yellow-500" />
                    <span>Pause Bot</span>
                  </DropdownMenuItem>
                )}
                {status === "maintenance" && onStatusChange && (
                  <DropdownMenuItem
                    onClick={() => onStatusChange(id, "active")}
                  >
                    <PlayCircle className="mr-2 h-4 w-4 text-green-500" />
                    <span>Activate Bot</span>
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem
                    onClick={() => onDelete(id)}
                    className="text-red-600"
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {!isCompact && (
            <>
              <div className="grid grid-cols-4 gap-2 mt-4">
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <Users className="h-3 w-3" />
                      <span>Users</span>
                    </div>
                    <span className="font-medium">
                      {stats.users.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <MessageSquare className="h-3 w-3" />
                      <span>Messages</span>
                    </div>
                    <span className="font-medium">
                      {stats.messages.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <Star className="h-3 w-3" />
                      <span>Rating</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium mr-1">
                        {stats.avgRating.toFixed(1)}
                      </span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            fill={
                              i < Math.floor(stats.avgRating)
                                ? "currentColor"
                                : "none"
                            }
                            className={`h-3 w-3 ${
                              i < Math.floor(stats.avgRating)
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
                      <Clock className="h-3 w-3" />
                      <span>Response Time</span>
                    </div>
                    <span className="font-medium">
                      {stats.avgResponseTime < 1000
                        ? `${stats.avgResponseTime}ms`
                        : `${(stats.avgResponseTime / 1000).toFixed(1)}s`}
                    </span>
                  </div>
                </div>
              </div>

              {stats.trainedPages !== undefined &&
                stats.maxPages !== undefined && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="text-muted-foreground">
                        Knowledge Base
                      </span>
                      <span className="font-medium">
                        {stats.trainedPages}/{stats.maxPages} pages
                      </span>
                    </div>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Progress
                            value={(stats.trainedPages / stats.maxPages) * 100}
                            className="h-1.5"
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p className="text-xs">
                            {stats.trainedPages} pages trained out of{" "}
                            {stats.maxPages} allowed
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                )}
            </>
          )}

          {isCompact && hasSites && (
            <div className="mt-2">
              <div className="flex flex-wrap gap-1">
                {integration.sites.slice(0, 2).map((site, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs px-1.5 py-0.5"
                  >
                    {site}
                  </Badge>
                ))}
                {integration.sites.length > 2 && (
                  <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                    +{integration.sites.length - 2} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>

        <CardFooter
          className={`${
            isCompact ? "px-4 pb-4" : "px-6 pb-6"
          } pt-0 flex flex-wrap justify-between items-center border-t border-blue-500/10 mt-4`}
        >
          <div className="text-xs text-muted-foreground">
            Updated {format(updateDate, "MMM d, yyyy")}
          </div>
          <Link href={`/dashboard/chatbots/${id}`}>
            <Button
              size="sm"
              variant="outline"
              className="text-xs border-blue-500/20 hover:bg-blue-500/10"
            >
              View Details
            </Button>
          </Link>
        </CardFooter>
      </Card>
    );
  }
);

ChatbotCard.displayName = "ChatbotCard";
