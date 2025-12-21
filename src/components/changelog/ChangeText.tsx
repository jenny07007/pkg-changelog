interface ChangeTextProps {
  text: string;
}

export function ChangeText({ text }: ChangeTextProps) {
  const scopeMatch = text.match(/^\[([^\]]+)\]\s*/);

  if (scopeMatch) {
    const scope = scopeMatch[1];
    const rest = text.slice(scopeMatch[0].length);

    return (
      <span>
        <span className="inline-block px-1.5 py-0.5 mr-2 text-xs font-medium bg-cyan-500/15 text-cyan-400 rounded">
          {scope}
        </span>
        {rest}
      </span>
    );
  }

  return <span>{text}</span>;
}
