export function Footer() {
  return (
    <footer className="mt-16 pb-8">
      <div className="flex items-center justify-center gap-3 text-sm text-zinc-500">
        <div className="flex items-center gap-1.5">
          <span>Built with 💛 by</span>
          <a
            href="https://github.com/jenny07007"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 hover:text-yellow-400 transition-colors"
          >
            Jenny
          </a>
        </div>
        <span className="text-zinc-600">|</span>
        <a
          href="https://github.com/jenny07007/pkg-changelog"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors"
          aria-label="View on GitHub"
        >
          <img src="/github-bk-icon.svg" alt="" width={18} height={18} />
        </a>
      </div>
    </footer>
  );
}
