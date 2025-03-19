"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface ChartDataset {
  label?: string;
  data: number[];
  color?: string;
  backgroundColor?: string | string[];
  fill?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: ChartDataset[];
}

interface AnalyticsChartProps {
  data: ChartData;
  type: "line" | "bar" | "pie" | "doughnut" | "radar";
  height?: number;
  showLegend?: boolean;
  className?: string;
}

export function AnalyticsChart({
  data,
  type = "line",
  height = 300,
  showLegend = false,
  className,
}: AnalyticsChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Clear the canvas
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // Render the chart
    renderChart(
      ctx,
      data,
      type,
      canvasRef.current.width,
      canvasRef.current.height,
      showLegend
    );
  }, [data, type, showLegend]);

  const renderChart = (
    ctx: CanvasRenderingContext2D,
    data: ChartData,
    type: string,
    width: number,
    height: number,
    showLegend: boolean
  ) => {
    // Check if we're in dark mode
    const isDarkMode =
      typeof document !== "undefined"
        ? document.documentElement.classList.contains("dark")
        : false;

    // Set colors based on theme
    const textColor = isDarkMode
      ? "rgba(255, 255, 255, 0.8)"
      : "rgba(0, 0, 0, 0.8)";
    const gridColor = isDarkMode
      ? "rgba(255, 255, 255, 0.1)"
      : "rgba(0, 0, 0, 0.1)";
    const lineColor = isDarkMode
      ? "rgba(59, 130, 246, 0.8)"
      : "rgba(59, 130, 246, 0.8)";
    const barColor = isDarkMode
      ? "rgba(99, 102, 241, 0.8)"
      : "rgba(99, 102, 241, 0.8)";

    // Set font
    ctx.font = "12px system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = textColor;

    // Calculate dimensions
    const padding = 40;
    const chartWidth = width - padding * 2;
    const chartHeight = height - padding * 2;
    const chartX = padding;
    const chartY = padding;

    // Draw cartesian grid for line and bar charts
    if (type === "line" || type === "bar") {
      // Draw grid
      ctx.beginPath();
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      // Vertical grid lines and x-axis labels
      const xStep = chartWidth / (data.labels.length - 1);
      for (let i = 0; i < data.labels.length; i++) {
        const x = chartX + i * xStep;
        ctx.moveTo(x, chartY);
        ctx.lineTo(x, chartY + chartHeight);
        ctx.fillText(data.labels[i], x, chartY + chartHeight + 15);
      }

      // Horizontal grid lines and y-axis values
      const maxValue = Math.max(
        ...data.datasets.flatMap((dataset) => dataset.data)
      );
      const yStep = chartHeight / 4;
      for (let i = 0; i <= 4; i++) {
        const y = chartY + chartHeight - i * yStep;
        ctx.moveTo(chartX, y);
        ctx.lineTo(chartX + chartWidth, y);
        ctx.fillText(((maxValue * i) / 4).toFixed(0), chartX - 20, y);
      }
      ctx.stroke();
    }

    // Draw datasets
    data.datasets.forEach((dataset, datasetIndex) => {
      if (type === "line") {
        // Line chart
        const yScale = chartHeight / Math.max(...dataset.data);
        const xStep = chartWidth / (dataset.data.length - 1);

        ctx.beginPath();
        ctx.strokeStyle = dataset.color || lineColor;
        ctx.lineWidth = 2;

        for (let i = 0; i < dataset.data.length; i++) {
          const x = chartX + i * xStep;
          const y = chartY + chartHeight - dataset.data[i] * yScale;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }

          // Draw point
          ctx.fillStyle = dataset.color || lineColor;
          ctx.beginPath();
          ctx.arc(x, y, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.stroke();

        // Fill area if needed
        if (dataset.fill) {
          ctx.beginPath();
          ctx.fillStyle = `${dataset.color || lineColor}20`;

          for (let i = 0; i < dataset.data.length; i++) {
            const x = chartX + i * xStep;
            const y = chartY + chartHeight - dataset.data[i] * yScale;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }

          // Close path at the bottom of the chart
          ctx.lineTo(
            chartX + (dataset.data.length - 1) * xStep,
            chartY + chartHeight
          );
          ctx.lineTo(chartX, chartY + chartHeight);
          ctx.closePath();
          ctx.fill();
        }
      } else if (type === "bar") {
        // Bar chart
        const yScale = chartHeight / Math.max(...dataset.data);
        const xStep = chartWidth / dataset.data.length;
        const barWidth = (xStep * 0.8) / data.datasets.length;

        ctx.fillStyle = dataset.color || barColor;

        for (let i = 0; i < dataset.data.length; i++) {
          const x = chartX + i * xStep + barWidth * datasetIndex + xStep * 0.1;
          const y = chartY + chartHeight - dataset.data[i] * yScale;
          const barHeight = dataset.data[i] * yScale;

          ctx.fillRect(x, y, barWidth, barHeight);
        }
      } else if (type === "pie" || type === "doughnut") {
        // Pie/Doughnut chart
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(chartWidth, chartHeight) / 2;
        const innerRadius = type === "doughnut" ? radius * 0.5 : 0;

        let total = dataset.data.reduce((a, b) => a + b, 0);
        let startAngle = -Math.PI / 2;

        const colors = Array.isArray(dataset.backgroundColor)
          ? dataset.backgroundColor
          : data.labels.map((_, i) => {
              // Generate colors if not provided
              const hue = ((i * 360) / data.labels.length) % 360;
              return `hsl(${hue}, 70%, 60%)`;
            });

        // Draw each slice
        dataset.data.forEach((value, i) => {
          const sliceAngle = (value / total) * Math.PI * 2;
          const endAngle = startAngle + sliceAngle;

          ctx.beginPath();
          ctx.fillStyle = colors[i] || `hsl(${i * 30}, 70%, 60%)`;
          ctx.moveTo(centerX, centerY);
          ctx.arc(centerX, centerY, radius, startAngle, endAngle);

          if (type === "doughnut") {
            ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
          }

          ctx.closePath();
          ctx.fill();

          // Add labels outside the pie
          const midAngle = startAngle + sliceAngle / 2;
          const labelRadius = radius * 1.2;
          const labelX = centerX + Math.cos(midAngle) * labelRadius;
          const labelY = centerY + Math.sin(midAngle) * labelRadius;

          ctx.fillStyle = textColor;
          ctx.fillText(`${data.labels[i]}`, labelX, labelY);

          startAngle = endAngle;
        });
      } else if (type === "radar") {
        // Radar chart
        const centerX = width / 2;
        const centerY = height / 2;
        const radius = Math.min(chartWidth, chartHeight) / 2;
        const sides = data.labels.length;

        // Draw background grid
        ctx.strokeStyle = gridColor;
        ctx.lineWidth = 1;

        // Draw circular grid
        for (let r = 0.2; r <= 1; r += 0.2) {
          ctx.beginPath();
          for (let i = 0; i < sides; i++) {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
            const x = centerX + Math.cos(angle) * radius * r;
            const y = centerY + Math.sin(angle) * radius * r;

            if (i === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          ctx.closePath();
          ctx.stroke();
        }

        // Draw axis lines
        for (let i = 0; i < sides; i++) {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
          const x = centerX + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;

          ctx.beginPath();
          ctx.moveTo(centerX, centerY);
          ctx.lineTo(x, y);
          ctx.stroke();

          // Draw labels
          const labelX = centerX + Math.cos(angle) * (radius * 1.1);
          const labelY = centerY + Math.sin(angle) * (radius * 1.1);
          ctx.fillText(data.labels[i], labelX, labelY);
        }

        // Draw dataset
        const maxValue = 100; // Assuming data is normalized to 0-100

        ctx.strokeStyle = dataset.color || lineColor;
        ctx.fillStyle = `${dataset.color || lineColor}30`;
        ctx.lineWidth = 2;

        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
          const angle = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
          const value = dataset.data[i] / maxValue;
          const x = centerX + Math.cos(angle) * radius * value;
          const y = centerY + Math.sin(angle) * radius * value;

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();
        ctx.stroke();

        if (dataset.fill) {
          ctx.fill();
        }
      }
    });

    // Draw legend if needed
    if (showLegend && data.datasets.some((ds) => ds.label)) {
      const legendX = width - 150;
      const legendY = 20;
      const lineHeight = 20;

      data.datasets.forEach((dataset, i) => {
        if (!dataset.label) return;

        const y = legendY + i * lineHeight;

        // Draw color box
        ctx.fillStyle =
          dataset.color || (type === "bar" ? barColor : lineColor);
        ctx.fillRect(legendX, y, 15, 15);

        // Draw label
        ctx.fillStyle = textColor;
        ctx.textAlign = "left";
        ctx.fillText(dataset.label, legendX + 20, y + 7);
      });
    }
  };

  return (
    <div
      className={cn(
        "w-full h-full flex items-center justify-center",
        className
      )}
      style={{ height: height + "px" }}
    >
      <canvas
        ref={canvasRef}
        width={800}
        height={height}
        className="w-full"
      ></canvas>
    </div>
  );
}
