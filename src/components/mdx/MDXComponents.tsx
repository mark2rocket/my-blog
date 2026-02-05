import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-3xl font-semibold mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-2xl font-medium mt-4 mb-2">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-4 leading-7">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || '#'}
      className="text-blue-600 hover:text-blue-800 underline"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-7">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-700">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    // Inline code
    if (!className) {
      return (
        <code className="bg-gray-100 rounded px-1.5 py-0.5 text-sm font-mono">
          {children}
        </code>
      );
    }
    // Code block
    return <CodeBlock className={className}>{children as string}</CodeBlock>;
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      className="rounded-lg my-4"
    />
  ),
};
