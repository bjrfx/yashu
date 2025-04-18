import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const MarkdownRenderer = ({ content }) => {
  // Custom renderers for markdown components
  const components = {
    h1: ({ node, ...props }) => (
      <h1 {...props} className="text-3xl font-bold font-serif mt-8 mb-4" />
    ),
    h2: ({ node, ...props }) => (
      <h2 {...props} className="text-2xl font-bold font-serif mt-8 mb-4" />
    ),
    h3: ({ node, ...props }) => (
      <h3 {...props} className="text-xl font-bold font-serif mt-6 mb-3" />
    ),
    h4: ({ node, ...props }) => (
      <h4 {...props} className="text-lg font-bold font-serif mt-6 mb-3" />
    ),
    h5: ({ node, ...props }) => (
      <h5 {...props} className="text-base font-bold font-serif mt-4 mb-2" />
    ),
    h6: ({ node, ...props }) => (
      <h6 {...props} className="text-sm font-bold font-serif mt-4 mb-2" />
    ),
    p: ({ node, ...props }) => (
      <p {...props} className="mb-4 leading-relaxed" />
    ),
    a: ({ node, ...props }) => (
      <a {...props} className="text-primary hover:underline" />
    ),
    strong: ({ node, ...props }) => (
      <strong {...props} className="font-bold" />
    ),
    em: ({ node, ...props }) => (
      <em {...props} className="italic" />
    ),
    blockquote: ({ node, ...props }) => (
      <blockquote {...props} className="pl-4 border-l-4 border-primary/30 my-6 italic" />
    ),
    ul: ({ node, ...props }) => (
      <ul {...props} className="list-disc pl-6 mb-4" />
    ),
    ol: ({ node, ...props }) => (
      <ol {...props} className="list-decimal pl-6 mb-4" />
    ),
    li: ({ node, ...props }) => (
      <li {...props} className="mb-1" />
    ),
    hr: ({ node, ...props }) => (
      <hr {...props} className="my-8 border-border" />
    ),
    img: ({ node, ...props }) => (
      <img {...props} className="rounded-lg my-6 max-w-full h-auto" />
    ),
    table: ({ node, ...props }) => (
      <div className="overflow-x-auto my-6">
        <table {...props} className="min-w-full divide-y divide-border" />
      </div>
    ),
    thead: ({ node, ...props }) => (
      <thead {...props} className="bg-muted" />
    ),
    tbody: ({ node, ...props }) => (
      <tbody {...props} className="divide-y divide-border" />
    ),
    tr: ({ node, ...props }) => (
      <tr {...props} />
    ),
    th: ({ node, ...props }) => (
      <th {...props} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider" />
    ),
    td: ({ node, ...props }) => (
      <td {...props} className="px-4 py-3 text-sm" />
    ),
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      
      return !inline && match ? (
        <SyntaxHighlighter
          style={vscDarkPlus}
          language={match[1]}
          PreTag="div"
          className="rounded-md my-6"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code
          className={`${className || ''} bg-muted px-1.5 py-0.5 rounded-md text-sm`}
          {...props}
        >
          {children}
        </code>
      );
    },
    // Handle pre tag
    pre: ({ node, ...props }) => (
      <pre className="rounded-md overflow-hidden my-6" {...props} />
    ),
  };

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={components}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
