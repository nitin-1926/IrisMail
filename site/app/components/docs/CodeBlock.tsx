'use client';

import { useState, useEffect, useRef } from 'react';
import { codeToHtml } from 'shiki';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

// Language display names
const languageLabels: Record<string, string> = {
  typescript: 'ts',
  javascript: 'js',
  tsx: 'tsx',
  jsx: 'jsx',
  bash: 'bash',
  shell: 'sh',
  json: 'json',
  css: 'css',
  html: 'html',
};

export function CodeBlock({
  code,
  language = 'typescript',
  filename,
  showLineNumbers = false,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const codeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    const highlight = async () => {
      try {
        const html = await codeToHtml(code.trim(), {
          lang: language,
          theme: 'github-dark-default',
        });
        
        if (isMounted) {
          setHighlightedCode(html);
          setIsLoading(false);
        }
      } catch {
        // Fallback for unsupported languages
        if (isMounted) {
          setHighlightedCode(`<pre><code>${escapeHtml(code.trim())}</code></pre>`);
          setIsLoading(false);
        }
      }
    };

    highlight();

    return () => {
      isMounted = false;
    };
  }, [code, language]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');
  const languageLabel = languageLabels[language] || language;

  return (
    <div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900">
      {/* Header */}
      {filename && (
        <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-1.5">
          <span className="text-[12px] text-zinc-500">{filename}</span>
          <span className="text-[10px] font-medium text-zinc-600">
            {languageLabel}
          </span>
        </div>
      )}

      {/* Code */}
      <div className="relative">
        {showLineNumbers ? (
          <div className="flex">
            {/* Line numbers */}
            <div className="shrink-0 select-none border-r border-zinc-800/50 py-2.5 pl-3 pr-2.5 text-right">
              {lines.map((_, i) => (
                <div key={i} className="text-[12px] leading-[1.35] text-zinc-700">
                  {i + 1}
                </div>
              ))}
            </div>
            {/* Code content */}
            <div className="min-w-0 flex-1 overflow-x-auto">
              {isLoading ? (
                <div className="code-block-content px-3 py-2.5">
                  <pre className="text-[12px] leading-[1.35]">
                    <code className="text-zinc-400">{code.trim()}</code>
                  </pre>
                </div>
              ) : (
                <div
                  ref={codeRef}
                  className="code-block-content px-3 py-2.5"
                  dangerouslySetInnerHTML={{ __html: highlightedCode }}
                />
              )}
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {isLoading ? (
              <div className="code-block-content px-3 py-2.5">
                <pre className="text-[12px] leading-[1.35]">
                  <code className="text-zinc-400">{code.trim()}</code>
                </pre>
              </div>
            ) : (
              <div
                ref={codeRef}
                className="code-block-content px-3 py-2.5"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            )}
          </div>
        )}

        {/* Copy button */}
        <button
          onClick={handleCopy}
          className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded text-zinc-500 opacity-0 transition-all hover:bg-zinc-800 hover:text-zinc-300 group-hover:opacity-100"
        >
          {copied ? (
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}

// Helper function to escape HTML
function escapeHtml(text: string): string {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
