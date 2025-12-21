import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import type { ChangelogEntry, EntryType } from "@/types/changelog";
import { ENTRY_TYPE_CONFIG, PREVIEW_COUNT } from "./constants";
import { ChangeText } from "./change-text";

interface ChangelogItemProps {
  entry: ChangelogEntry;
  index: number;
  isNew?: boolean;
}

function getEntryType(entry: ChangelogEntry): EntryType {
  const hasFeatures = entry.features.length > 0;
  const hasBugFixes = entry.bugFixes.length > 0;

  if (hasFeatures && hasBugFixes) return "mixed";
  if (hasFeatures) return "feature";
  return "bug-fix";
}

export function ChangelogItem({ entry, index, isNew }: ChangelogItemProps) {
  const [expanded, setExpanded] = useState(false);
  const entryType = getEntryType(entry);
  const config = ENTRY_TYPE_CONFIG[entryType];
  const hasContent = entry.features.length > 0 || entry.bugFixes.length > 0;

  const hasMoreFeatures = entry.features.length > PREVIEW_COUNT;
  const hasMoreBugFixes = entry.bugFixes.length > PREVIEW_COUNT;
  const hasMore = hasMoreFeatures || hasMoreBugFixes;

  const displayedFeatures = expanded
    ? entry.features
    : entry.features.slice(0, PREVIEW_COUNT);
  const displayedBugFixes = expanded
    ? entry.bugFixes
    : entry.bugFixes.slice(0, PREVIEW_COUNT);

  const hiddenCount =
    entry.features.length +
    entry.bugFixes.length -
    (Math.min(entry.features.length, PREVIEW_COUNT) +
      Math.min(entry.bugFixes.length, PREVIEW_COUNT));

  return (
    <div
      className="relative pl-8 w-full animate-in fade-in slide-in-from-bottom-6 duration-500 ease-out"
      style={{ animationDelay: `${index * 75}ms`, animationFillMode: "both" }}
    >
      <div
        className={cn(
          "absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-[#09090b]",
          config.color,
        )}
      />

      <div className="flex items-center gap-3 mb-3 text-sm">
        <span className="text-zinc-500">{entry.date}</span>
        <span className="text-zinc-600">-</span>
        <span className="text-zinc-400">{config.label}</span>
      </div>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            v{entry.version}
            {isNew && (
              <span className="relative px-2 py-0.5 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full overflow-hidden">
                New
                <BorderBeam
                  duration={3}
                  colorFrom="#3b82f6"
                  colorTo="#60a5fa"
                />
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {hasContent ? (
            <div className="space-y-4">
              {entry.features.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-green-400 mb-2">
                    Features
                  </h4>
                  <ul className="space-y-2">
                    {displayedFeatures.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-400">
                        <ChangeText text={feature} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {entry.bugFixes.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-orange-400 mb-2">
                    Bug Fixes
                  </h4>
                  <ul className="space-y-2">
                    {displayedBugFixes.map((fix, i) => (
                      <li key={i} className="text-sm text-gray-400">
                        <ChangeText text={fix} />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {hasMore && (
                <button
                  onClick={() => setExpanded(!expanded)}
                  className="text-sm text-blue-400 hover:text-blue-300 cursor-pointer transition-colors"
                >
                  {expanded ? "Show less" : `+${hiddenCount} more`}
                </button>
              )}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No detailed changes listed</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
