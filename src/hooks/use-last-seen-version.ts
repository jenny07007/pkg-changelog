import { useEffect, useState } from "react";

const STORAGE_KEY_PREFIX = "changelog-last-seen-";

function getStorageKey(packageName: string) {
  return `${STORAGE_KEY_PREFIX}${packageName}`;
}

export function useLastSeenVersion(
  packageName: string,
  currentVersion: string | undefined,
) {
  const [lastSeenVersion, setLastSeenVersion] = useState<string | null>(() => {
    if (!packageName) return null;
    return localStorage.getItem(getStorageKey(packageName));
  });

  useEffect(() => {
    if (!packageName) {
      queueMicrotask(() => setLastSeenVersion(null));
      return;
    }

    const stored = localStorage.getItem(getStorageKey(packageName));
    queueMicrotask(() => setLastSeenVersion(stored));
  }, [packageName]);

  useEffect(() => {
    if (!packageName || !currentVersion) return;

    localStorage.setItem(getStorageKey(packageName), currentVersion);
  }, [packageName, currentVersion]);

  return lastSeenVersion;
}

export function isNewerVersion(
  version: string,
  lastSeenVersion: string | null,
): boolean {
  // First time visitor - show "New" badge on latest
  if (!lastSeenVersion) return true;

  const parseVersion = (v: string) => {
    const parts = v.replace(/^v/, "").split(".").map(Number);
    return parts;
  };

  const current = parseVersion(version);
  const lastSeen = parseVersion(lastSeenVersion);

  for (let i = 0; i < Math.max(current.length, lastSeen.length); i++) {
    const c = current[i] || 0;
    const l = lastSeen[i] || 0;
    if (c > l) return true;
    if (c < l) return false;
  }

  return false;
}
