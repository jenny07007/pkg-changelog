"use client";

import { SparklesText } from "./sparkles-text";
import { cn } from "@/lib/utils";

interface ChristmasTitleProps {
  children: React.ReactNode;
  className?: string;
}

function SantaHat({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={cn("absolute", className)}
      style={{
        width: "42px",
        height: "42px",
        top: "-26px",
        left: "-6px",
        transform: "rotate(-15deg)",
      }}
    >
      {/* Hat base (red part) */}
      <path
        d="M8 48 C8 48, 20 20, 52 28 C52 28, 56 32, 26 38 C50 41, 12 52, 8 48Z"
        fill="#dc2626"
      />
      {/* Hat darker shade */}
      <path
        d="M12 46 C12 46, 22 26, 50 32 C48 38, 14 48, 12 46Z"
        fill="#b91c1c"
        opacity="0.5"
      />
      {/* White fur trim */}
      <ellipse cx="20" cy="50" rx="18" ry="6" fill="#fafafa" />
      <ellipse cx="20" cy="50" rx="18" ry="6" fill="url(#furGradient)" />
      {/* Pompom */}
      <circle cx="54" cy="30" r="6" fill="#fafafa" />
      <circle cx="56" cy="28" r="3" fill="#f5f5f5" opacity="0.6" />
      {/* Gradient definitions */}
      <defs>
        <radialGradient id="furGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#e5e5e5" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export function ChristmasTitle({ children, className }: ChristmasTitleProps) {
  return (
    <span className={cn("relative inline-block", className)}>
      <SantaHat />
      <SparklesText
        colors={{ first: "#ef4444", second: "#22c55e" }}
        sparklesCount={25}
      >
        {children}
      </SparklesText>
    </span>
  );
}
