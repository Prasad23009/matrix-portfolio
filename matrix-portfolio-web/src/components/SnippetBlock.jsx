import { useState } from 'react';

export default function SnippetBlock({ language, code }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden my-4 border border-gray-700">
      <div className="bg-gray-800 px-4 py-2 flex justify-between items-center text-xs text-gray-400">
        <span>{language.toUpperCase()}</span>
        <button
          onClick={handleCopy}
          className="bg-indigo-600 text-white px-2.5 py-1 rounded hover:bg-indigo-500 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy Code'}
        </button>
      </div>
      <pre className="p-4 text-sm text-gray-200 overflow-x-auto font-mono">
        <code>{code}</code>
      </pre>
    </div>
  );
}