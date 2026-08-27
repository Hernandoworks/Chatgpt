import type { ReactNode } from "react";

export interface TooltipProps { content: string; children: ReactNode; }
export function Tooltip({ content, children }: TooltipProps) {
  return <span className="group relative inline-flex"><span tabIndex={0} aria-label={content}>{children}</span><span role="tooltip" className="pointer-events-none absolute bottom-full left-1/2 z-40 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100 group-focus-within:opacity-100">{content}</span></span>;
}
