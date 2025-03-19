"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, MessageSquare, Users, Star } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface ChatbotCardProps {
  id: number;
  name: string;
  description: string;
  status: string;
  users: number;
  messages: number;
  lastUpdated: string;
  averageRating: number;
}

export const ChatbotCard = ({
  id,
  name,
  description,
  status,
  users,
  messages,
  lastUpdated,
  averageRating,
}: ChatbotCardProps) => {
  return (
    <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Badge
                variant={status === "active" ? "default" : "outline"}
                className={
                  status === "active"
                    ? "bg-green-500/20 text-green-500 hover:bg-green-500/30"
                    : "bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30"
                }
              >
                {status === "active" ? "Active" : "Maintenance"}
              </Badge>
            </div>
            <p className="text-muted-foreground text-sm mt-1">{description}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Duplicate</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Analytics</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <Users className="h-3 w-3" />
              <span>Users</span>
            </div>
            <span className="font-medium">{users.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <MessageSquare className="h-3 w-3" />
              <span>Messages</span>
            </div>
            <span className="font-medium">{messages.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1 text-muted-foreground text-xs mb-1">
              <Star className="h-3 w-3" />
              <span>Rating</span>
            </div>
            <span className="font-medium">{averageRating.toFixed(1)}/5</span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-blue-500/10 flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Updated {lastUpdated}
          </span>
          <Button
            size="sm"
            variant="outline"
            className="text-xs border-blue-500/20 hover:bg-blue-500/10"
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
