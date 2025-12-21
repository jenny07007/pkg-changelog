import { cn } from "@/lib/utils";

interface BorderBeamProps {
  className?: string;
  duration?: number;
  colorFrom?: string;
  colorTo?: string;
}

export const BorderBeam = ({
  className,
  duration = 3,
  colorFrom = "#3b82f6",
  colorTo = "#60a5fa",
}: BorderBeamProps) => {
  return (
    <>
      <style>
        {`
          @keyframes border-beam {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div
        className={cn(
          "pointer-events-none absolute -inset-px rounded-[inherit] overflow-hidden -z-10",
          className
        )}
      >
        <div
          className="absolute -inset-full"
          style={{
            background: `conic-gradient(from 0deg, transparent 0%, transparent 25%, ${colorFrom} 50%, ${colorTo} 75%, transparent 100%)`,
            animation: `border-beam ${duration}s linear infinite`,
          }}
        />
      </div>
    </>
  );
};
