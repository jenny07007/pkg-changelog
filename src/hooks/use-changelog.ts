import { useQuery } from "@tanstack/react-query";
import { fetchPackageChangelog } from "@/api/fetch-changelog";
import type { PackageInfo } from "@/types/changelog";

export function useChangelog(packageName: string) {
  return useQuery<PackageInfo>({
    queryKey: ["changelog", packageName],
    queryFn: () => fetchPackageChangelog(packageName),
    enabled: packageName.length > 0,
    placeholderData: (previousData) => previousData,
    staleTime: 60 * 60 * 1000,
    refetchInterval: 60 * 60 * 1000,
  });
}
