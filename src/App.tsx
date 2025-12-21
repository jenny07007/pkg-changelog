import { useState } from "react";
import { Meteors } from "@/components/ui/meteors";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { LoadingOverlay } from "@/components/loading-overlay";
import { PackageHeader } from "@/components/package-header";
import {
  ErrorCard,
  NoChangelogCard,
  PlaceholderCard,
} from "@/components/status-cards";
import { ChangelogList, ITEMS_PER_PAGE } from "@/components/changelog";
import { useChangelog } from "@/hooks/use-changelog";
import { useLastSeenVersion } from "@/hooks/use-last-seen-version";

const DEFAULT_PACKAGE = "@dynamic-labs/sdk-react-core";

export default function App() {
  const [packageName, setPackageName] = useState(DEFAULT_PACKAGE);
  const [inputValue, setInputValue] = useState(packageName);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isFetching, error } = useChangelog(packageName);
  const lastSeenVersion = useLastSeenVersion(packageName, data?.version);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (trimmed && trimmed !== packageName) {
      setPackageName(trimmed);
      setCurrentPage(1);
    }
  };

  const isSearching = isLoading || isFetching;
  const totalEntries = data?.entries.length ?? 0;
  const totalPages = Math.ceil(totalEntries / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedEntries =
    data?.entries.slice(startIndex, startIndex + ITEMS_PER_PAGE) ?? [];

  return (
    <div className="relative min-h-screen w-full px-4 sm:px-6 py-8 sm:py-16 overflow-hidden">
      <Meteors number={30} />
      <div className="relative z-10 w-full max-w-3xl mx-auto">
        <Header
          inputValue={inputValue}
          isSearching={isSearching}
          onInputChange={setInputValue}
          onSubmit={handleSubmit}
        />

        <div className="relative">
          {isSearching && <LoadingOverlay packageName={packageName} />}

          {error && !data && <ErrorCard packageName={packageName} />}

          {data && data.entries.length > 0 && (
            <>
              <PackageHeader name={data.name} version={data.version} />
              <ChangelogList
                entries={paginatedEntries}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                lastSeenVersion={lastSeenVersion}
              />
            </>
          )}

          {data && data.entries.length === 0 && (
            <NoChangelogCard packageName={packageName} />
          )}

          {!data && !error && !isSearching && <PlaceholderCard />}
        </div>

        <Footer />
      </div>
    </div>
  );
}
