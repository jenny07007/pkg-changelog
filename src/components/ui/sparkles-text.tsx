"use client";

import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { cn } from "../../lib/utils";

interface Sparkle {
  id: string;
  x: string;
  y: string;
  color: string;
  delay: number;
  scale: number;
  repeatDelay: number;
}

interface SparklesTextProps {
  children: React.ReactNode;
  className?: string;
  sparklesCount?: number;
  colors?: {
    first: string;
    second: string;
  };
}

export function SparklesText({
  children,
  className,
  sparklesCount = 20,
  colors = { first: "#3b82f6", second: "#60a5fa" },
}: SparklesTextProps) {
  const generateSparkle = (): Sparkle => ({
    id: Math.random().toString(36).substring(2, 9),
    x: `${Math.random() * 100}%`,
    y: `${Math.random() * 100}%`,
    color: Math.random() > 0.5 ? colors.first : colors.second,
    delay: Math.random() * 2,
    scale: Math.random() * 0.5 + 0.5,
    repeatDelay: Math.random() * 2 + 1,
  });

  const initialSparkles = useMemo(
    () => Array.from({ length: sparklesCount }, generateSparkle),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [sparklesCount],
  );

  const [sparkles, setSparkles] = useState<Sparkle[]>(initialSparkles);

  useEffect(() => {
    const interval = setInterval(() => {
      setSparkles((current) =>
        current.map((sparkle) =>
          Math.random() > 0.7 ? generateSparkle() : sparkle,
        ),
      );
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className={cn("relative inline-block", className)}>
      <span className="relative z-10 text-blue-500">{children}</span>
      {sparkles.map((sparkle) => (
        <motion.span
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: sparkle.x,
            top: sparkle.y,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, sparkle.scale, 0],
          }}
          transition={{
            duration: 1.5,
            delay: sparkle.delay,
            repeat: Infinity,
            repeatDelay: sparkle.repeatDelay,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            className="block"
          >
            <path
              d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"
              fill={sparkle.color}
            />
          </svg>
        </motion.span>
      ))}
    </span>
  );
}
