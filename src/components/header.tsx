import { ShimmerButton } from "@/components/ui/shimmer-button";
import { ChristmasTitle } from "@/components/ui/christmas-title";
import { LoadingSpinner } from "@/components/loading-spinner";

interface HeaderProps {
  inputValue: string;
  isSearching: boolean;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function Header({
  inputValue,
  isSearching,
  onInputChange,
  onSubmit,
}: HeaderProps) {
  return (
    <header className="mb-8 w-full">
      <h1 className="text-4xl font-bold mb-4 text-center sm:text-left pt-8">
        <ChristmasTitle>Changelog</ChristmasTitle>
      </h1>
      <p className="text-zinc-500 mb-6 text-center sm:text-left">
        Track npm package updates. Works with{" "}
        <a
          href="https://keepachangelog.com/en/1.1.0/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-zinc-400 hover:text-zinc-200 underline underline-offset-2 transition-colors"
        >
          Keep a Changelog
        </a>{" "}
        format.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter package name (e.g. axios, date-fns)"
          className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:border-zinc-600 transition-colors"
          disabled={isSearching}
        />
        <ShimmerButton
          type="submit"
          disabled={isSearching || !inputValue.trim()}
          className="w-32 sm:w-24 mx-auto sm:mx-0 mt-2"
        >
          {isSearching ? <LoadingSpinner /> : "Search"}
        </ShimmerButton>
      </form>
    </header>
  );
}
