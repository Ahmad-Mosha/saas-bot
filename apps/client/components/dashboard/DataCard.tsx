"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface DataCardProps {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  description?: string;
  change?: string;
  positive?: boolean | null;
  variant?: "default" | "filled" | "outline";
  className?: string;
  footer?: ReactNode;
  loading?: boolean;
}

export const DataCard = ({
  title,
  value,
  icon: Icon,
  description,
  change,
  positive,
  variant = "default",
  className = "",
  footer,
  loading = false,
}: DataCardProps) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "filled":
        return "bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 border-blue-500/30";
      case "outline":
        return "bg-transparent border-blue-500/30";
      default:
        return "bg-card/50 backdrop-blur-sm border-blue-500/20";
    }
  };

  return (
    <Card
      className={`${getVariantClasses()} ${className} transition-all duration-200 hover:shadow-md`}
    >
      {loading ? (
        <CardContent className="p-6">
          <div className="flex flex-col space-y-3">
            <div className="w-1/2 h-5 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            <div className="w-full h-7 bg-gray-300 dark:bg-gray-600 animate-pulse rounded"></div>
            {description && (
              <div className="w-3/4 h-4 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
            )}
          </div>
        </CardContent>
      ) : (
        <>
          <CardHeader className={`${description ? "pb-2" : "pb-0"} pt-5 px-6`}>
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              {Icon && (
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Icon className="h-4 w-4 text-blue-400" />
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-5">
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl md:text-3xl font-bold">{value}</span>
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
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
              {footer && <div className="mt-4">{footer}</div>}
            </div>
          </CardContent>
        </>
      )}
    </Card>
  );
};
