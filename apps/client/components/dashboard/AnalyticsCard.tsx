import { ReactNode } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface AnalyticsCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  description: string;
  icon: ReactNode;
  className?: string;
}

export function AnalyticsCard({
  title,
  value,
  change,
  trend,
  description,
  icon,
  className,
}: AnalyticsCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold">{value}</h3>
              <div
                className={cn(
                  "flex items-center text-xs font-medium",
                  trend === "up"
                    ? "text-green-500"
                    : trend === "down"
                    ? "text-red-500"
                    : "text-muted-foreground"
                )}
              >
                {trend === "up" ? (
                  <ArrowUp className="h-3 w-3 mr-1" />
                ) : trend === "down" ? (
                  <ArrowDown className="h-3 w-3 mr-1" />
                ) : null}
                {change}
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          </div>
          <div className="h-9 w-9 rounded-md bg-primary/10 flex items-center justify-center">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
