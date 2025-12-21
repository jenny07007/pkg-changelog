import { LoadingSpinner } from "@/components/loading-spinner";

interface LoadingOverlayProps {
  packageName: string;
}

export function LoadingOverlay({ packageName }: LoadingOverlayProps) {
  return (
    <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg">
      <div className="text-zinc-500 flex items-center gap-3">
        <LoadingSpinner />
        Loading changelog for {packageName}...
      </div>
    </div>
  );
}
