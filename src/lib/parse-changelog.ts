import type { ChangelogEntry } from "@/types/changelog";

export function parseChangelog(changelog: string): ChangelogEntry[] {
  const entries: ChangelogEntry[] = [];
  const lines = changelog.split("\n");

  let currentEntry: Partial<ChangelogEntry> | null = null;
  let currentSection: "features" | "bug-fixes" | null = null;

  // Match: ### [4.51.2](url) (2025-12-19) or ## [4.51.0](url) (2025-12-18)
  const versionRegex =
    /^#{2,3}\s+\[(\d+\.\d+\.\d+)\].*?\((\d{4}-\d{2}-\d{2})\)/;

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

      currentEntry = {
        version: versionMatch[1],
        date: versionMatch[2],
        features: [],
        bugFixes: [],
      };
      currentSection = null;
    } else if (currentEntry) {
      if (line.match(/^###\s+Features/i)) {
        currentSection = "features";
      } else if (line.match(/^###\s+Bug\s*Fixes/i)) {
        currentSection = "bug-fixes";
      } else if (line.trim().startsWith("*") && currentSection) {
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
  let text = line.trim().replace(/^\*\s*/, "");
  // Remove markdown links but keep text: [text](url) -> text
  text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  // Remove commit hashes in parentheses
  text = text.replace(/\s*\([a-f0-9]{7}\)$/, "");
  // Convert **scope:** to [scope] tag format
  text = text.replace(/^\*\*([^*]+):\*\*\s*/, "[$1] ");
  return text;
}
