export interface ChangelogEntry {
  version: string;
  date: string;
  features: string[];
  bugFixes: string[];
}

export interface PackageInfo {
  name: string;
  version: string;
  entries: ChangelogEntry[];
}

export interface NpmPackageInfo {
  name: string;
  "dist-tags": {
    latest: string;
  };
}

export type EntryType = "feature" | "bug-fix" | "mixed";

export interface EntryTypeConfig {
  color: string;
  label: string;
}
