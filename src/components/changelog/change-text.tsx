import type { ReactElement } from "react";

interface ChangeTextProps {
  text: string;
}

export function ChangeText({ text }: ChangeTextProps) {
  const scopeMatch = text.match(/^\[([^\]]+)\]\s*/);

  // Parse and render text with inline images
  const renderTextWithImages = (content: string) => {
    // Match <img> tags with src attribute
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g;
    const parts: (string | ReactElement)[] = [];
    let lastIndex = 0;
    let match;
    let keyIndex = 0;

    while ((match = imgRegex.exec(content)) !== null) {
      // Add text before the image
      if (match.index > lastIndex) {
        parts.push(content.slice(lastIndex, match.index));
      }
      // Add the image
      parts.push(
        <img
          key={keyIndex++}
          src={match[1].replace(/&amp;/g, "&")}
          alt="avatar"
          className="inline-block size-4 rounded-full mx-0.5 align-text-bottom"
        />
      );
      lastIndex = match.index + match[0].length;
    }
    // Add remaining text, cleaning up trailing ")
    if (lastIndex < content.length) {
      let remaining = content.slice(lastIndex);
      // Remove trailing ") that comes from malformed markdown
      remaining = remaining.replace(/"\)$/, "");
      if (remaining.trim()) {
        parts.push(remaining);
      }
    }
    return parts.length > 0 ? parts : content;
  };

  if (scopeMatch) {
    const scope = scopeMatch[1];
    const rest = text.slice(scopeMatch[0].length);

    return (
      <span>
        <span className="inline-block px-1.5 py-0.5 mr-2 text-xs font-medium bg-cyan-500/15 text-cyan-400 rounded">
          {scope}
        </span>
        {renderTextWithImages(rest)}
      </span>
    );
  }

  return <span>{renderTextWithImages(text)}</span>;
}
