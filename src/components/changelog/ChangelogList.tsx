import { ChangelogItem } from "./ChangelogItem";
import { Pagination } from "./Pagination";
import { isNewerVersion } from "@/hooks/use-last-seen-version";
import type { ChangelogEntry } from "@/types/changelog";

interface ChangelogListProps {
  entries: ChangelogEntry[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  lastSeenVersion: string | null;
}

export function ChangelogList({
  entries,
  currentPage,
  totalPages,
  onPageChange,
  lastSeenVersion,
}: ChangelogListProps) {
  return (
    <div className="relative w-full">
      <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-800" />

      <div className="space-y-6 w-full">
        {entries.map((entry, index) => (
          <ChangelogItem
            key={entry.version}
            entry={entry}
            index={index}
            isNew={index === 0 && currentPage === 1 && isNewerVersion(entry.version, lastSeenVersion)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
}
