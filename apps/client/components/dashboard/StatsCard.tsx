"use client";

import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  positive?: boolean | null;
}

export const StatsCard = ({
  title,
  value,
  icon: Icon,
  change,
  positive,
}: StatsCardProps) => {
  return (
    <Card className="border-blue-500/20 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-sm">{title}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold">{value}</span>
              {change && (
                <span
                  className={`text-xs font-medium ${
                    positive === null
                      ? "text-muted-foreground"
                      : positive
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {change}
                </span>
              )}
            </div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-blue-400" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
