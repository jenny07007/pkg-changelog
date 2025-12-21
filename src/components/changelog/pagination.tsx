import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const visiblePages = getVisiblePages(currentPage, totalPages);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className={cn(
          "px-3 py-1.5 rounded-lg text-sm transition-colors",
          currentPage === 1
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20",
        )}
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {visiblePages.map((page, index) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${index}`}
              className="w-8 h-8 flex items-center justify-center text-gray-500"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={cn(
                "w-8 h-8 rounded-lg text-sm transition-colors",
                page === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10",
              )}
            >
              {page}
            </button>
          ),
        )}
      </div>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className={cn(
          "px-3 py-1.5 rounded-lg text-sm transition-colors",
          currentPage === totalPages
            ? "bg-white/5 text-gray-500 cursor-not-allowed"
            : "bg-white/10 text-white hover:bg-white/20",
        )}
      >
        Next
      </button>
    </div>
  );
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const showEllipsisStart = currentPage > 3;
  const showEllipsisEnd = currentPage < totalPages - 2;

  pages.push(1);

  if (showEllipsisStart) {
    pages.push("ellipsis");
  }

  for (
    let i = Math.max(2, currentPage - 1);
    i <= Math.min(totalPages - 1, currentPage + 1);
    i++
  ) {
    if (!pages.includes(i)) {
      pages.push(i);
    }
  }

  if (showEllipsisEnd) {
    pages.push("ellipsis");
  }

  if (totalPages > 1 && !pages.includes(totalPages)) {
    pages.push(totalPages);
  }

  return pages;
}
