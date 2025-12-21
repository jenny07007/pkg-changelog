interface PackageHeaderProps {
  name: string;
  version: string;
}

export function PackageHeader({ name, version }: PackageHeaderProps) {
  const npmUrl = `https://www.npmjs.com/package/${name}`;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-800">
      <div className="flex items-baseline gap-2 sm:block min-w-0">
        <h2 className="text-lg sm:text-xl font-semibold text-zinc-100 truncate">
          {name}
        </h2>
        <span className="text-sm text-zinc-500 shrink-0">v{version}</span>
      </div>
      <a
        href={npmUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 px-3 py-1.5 text-sm text-zinc-400 hover:text-zinc-100 bg-zinc-800/50 hover:bg-zinc-800 rounded-lg transition-colors w-fit"
      >
        <svg viewBox="0 0 780 250" className="h-4 w-auto fill-current">
          <path d="M240,250h100v-50h100V0H240V250z M340,50h50v100h-50V50z M480,0v200h100V50h50v150h50V50h50v150h50V0H480z M0,200h100V50h50v150h50V0H0V200z" />
        </svg>
        View on npm
      </a>
    </div>
  );
}
