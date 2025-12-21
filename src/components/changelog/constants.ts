import type { EntryType, EntryTypeConfig } from "@/types/changelog";

export const ITEMS_PER_PAGE = 5;
export const PREVIEW_COUNT = 3;

export const ENTRY_TYPE_CONFIG: Record<EntryType, EntryTypeConfig> = {
  "bug-fix": {
    color: "bg-emerald-500",
    label: "Bug Fixes",
  },
  feature: {
    color: "bg-zinc-100",
    label: "New Feature",
  },
  mixed: {
    color: "bg-zinc-400",
    label: "Update",
  },
};
