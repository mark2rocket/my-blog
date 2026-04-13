import type { MDXComponents } from 'mdx/types';
import Image from 'next/image';
import Link from 'next/link';
import { CodeBlock } from './CodeBlock';

export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <h1 className="text-4xl font-bold tracking-tight leading-tight mt-10 mb-5 text-zinc-900">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-2xl font-semibold tracking-tight mt-10 mb-4 text-zinc-900">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-lg font-semibold mt-7 mb-3 text-zinc-800">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="my-5 leading-[1.9] text-zinc-700">{children}</p>
  ),
  a: ({ href, children }) => (
    <Link
      href={href || '#'}
      className="text-primary hover:opacity-75 underline underline-offset-2 transition-opacity duration-150"
    >
      {children}
    </Link>
  ),
  ul: ({ children }) => (
    <ul className="list-disc list-outside pl-5 my-5 space-y-2 text-zinc-700">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal list-outside pl-5 my-5 space-y-2 text-zinc-700">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="leading-[1.9]">{children}</li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary/40 pl-5 my-7 py-3 bg-accent/20 rounded-r-md text-zinc-600 leading-[1.9] not-italic">
      {children}
    </blockquote>
  ),
  code: ({ className, children }) => {
    if (!className) {
      return (
        <code className="bg-zinc-100 rounded px-1.5 py-0.5 text-sm font-mono text-zinc-700">
          {children}
        </code>
      );
    }
    return <CodeBlock className={className}>{children as string}</CodeBlock>;
  },
  pre: ({ children }) => <>{children}</>,
  img: ({ src, alt }) => (
    <Image
      src={src || ''}
      alt={alt || ''}
      width={800}
      height={400}
      className="rounded-lg my-6 w-full"
    />
  ),
};
