import type { ChangelogEntry } from "@/types/changelog";

export function parseChangelog(changelog: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = changelog.split("\n");

  let currentEntry: Partial<ChangelogEntry> | null = null;
  let currentSection: "features" | "bug-fixes" | null = null;

  // Match multiple formats:
  // 1. ### [4.51.2](url) (2025-12-19) - Dynamic format
  // 2. ## [1.0.0] - 2023-03-05 - Keep a Changelog format
  // 3. ## [1.0.0](url) - 2023-03-05 - Keep a Changelog with link
  const versionRegex =
    /^#{2,3}\s+\[(\d+\.\d+\.\d+)\](?:\([^)]*\))?\s*[-–]\s*(\d{4}-\d{2}-\d{2})|^#{2,3}\s+\[(\d+\.\d+\.\d+)\].*?\((\d{4}-\d{2}-\d{2})\)/;

  for (const line of lines) {
    const versionMatch = line.match(versionRegex);

    if (versionMatch) {
      if (currentEntry && currentEntry.version) {
        entries.push({
          version: currentEntry.version,
          date: currentEntry.date ?? "Unknown",
          features: currentEntry.features ?? [],
          bugFixes: currentEntry.bugFixes ?? [],
        });
      }

      // Handle both capture group patterns
      const version = versionMatch[1] || versionMatch[3];
      const date = versionMatch[2] || versionMatch[4];

      currentEntry = {
        version,
        date,
        features: [],
        bugFixes: [],
      };
      currentSection = null;
    } else if (currentEntry) {
      // Match both formats: "### Features" / "### Added" and "### Bug Fixes" / "### Fixed"
      if (line.match(/^###\s+(Features|Added)/i)) {
        currentSection = "features";
      } else if (line.match(/^###\s+(Bug\s*Fixes|Fixed)/i)) {
        currentSection = "bug-fixes";
      } else if (line.match(/^###\s+(Changed|Deprecated|Removed|Security)/i)) {
        // Treat other Keep a Changelog sections as features for now
        currentSection = "features";
      } else if ((line.trim().startsWith("*") || line.trim().startsWith("-")) && currentSection) {
        const changeText = parseChangeText(line);

        if (currentSection === "features") {
          currentEntry.features?.push(changeText);
        } else if (currentSection === "bug-fixes") {
          currentEntry.bugFixes?.push(changeText);
        }
      }
    }
  }

  if (currentEntry && currentEntry.version) {
    entries.push({
      version: currentEntry.version,
      date: currentEntry.date ?? "Unknown",
      features: currentEntry.features ?? [],
      bugFixes: currentEntry.bugFixes ?? [],
    });
  }

  return entries;
}

function parseChangeText(line: string): string {
  let text = line.trim().replace(/^[*-]\s*/, "");
  // Remove markdown links but keep text: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove commit hashes in parentheses
  text = text.replace(/\s*\([a-f0-9]{7}\)$/, "");
  // Convert **scope:** to [scope] tag format
  text = text.replace(/^\*\*([^*]+):\*\*\s*/, "[$1] ");
  return text;
}
