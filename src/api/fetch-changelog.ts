import ky from "ky";
import type {
  PackageInfo,
  NpmPackageInfo,
  ChangelogEntry,
} from "@/types/changelog";
import { parseChangelog } from "@/lib/parse-changelog";

export async function fetchPackageChangelog(
  packageName: string,
): Promise<PackageInfo> {
  const info = await ky
    .get(`https://registry.npmjs.org/${packageName}`)
    .json<NpmPackageInfo>();

  let entries: ChangelogEntry[] = [];
  try {
    const changelog = await ky
      .get(`https://unpkg.com/${packageName}/CHANGELOG.md`)
      .text();
    entries = parseChangelog(changelog);
  } catch {
    // No changelog available
  }

  return {
    name: info.name,
    version: info["dist-tags"].latest,
    entries,
  };
}
