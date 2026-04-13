import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { format } from 'date-fns';
import { PostTracker } from '@/components/blog/PostTracker';
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react';

function estimateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      images: post.image ? [post.image] : [],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getPostBySlug(slug),
    getAllPosts(),
  ]);

  if (!post) {
    notFound();
  }

  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const readingTime = estimateReadingTime(post.content);

  return (
    <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <PostTracker slug={slug} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            dateModified: post.date,
            author: {
              '@type': 'Person',
              name: post.author || 'CPF',
              url: `${process.env.SITE_URL || 'https://example.com'}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'CPF',
              logo: {
                '@type': 'ImageObject',
                url: `${process.env.SITE_URL || 'https://example.com'}/og-image.svg`,
              },
            },
            image: post.image || `${process.env.SITE_URL || 'https://example.com'}/og-image.svg`,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${process.env.SITE_URL || 'https://example.com'}/blog/${slug}`,
            },
            keywords: post.tags?.join(', ') || '',
          }),
        }}
      />

      {/* Back */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-700 transition-colors duration-150 mb-12"
      >
        <ArrowLeft size={14} />
        Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <div className="flex items-center gap-3 text-xs text-zinc-400 mb-4">
          <time>{format(new Date(post.date), 'yyyy년 MM월 dd일')}</time>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock size={12} />
            {readingTime}분 읽기
          </span>
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-zinc-900 leading-tight mb-4">
          {post.title}
        </h1>
        {post.description && (
          <p className="text-lg text-zinc-500 leading-relaxed">{post.description}</p>
        )}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="border-t border-zinc-200 mb-10" />

      {/* Content */}
      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>

      {/* Prev / Next */}
      {(prevPost || nextPost) && (
        <div className="mt-16 pt-8 border-t border-zinc-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevPost ? (
            <Link
              href={`/blog/${prevPost.slug}`}
              className="group flex flex-col gap-1.5 p-4 rounded-lg border border-zinc-200 hover:border-primary/40 hover:bg-zinc-50 transition-all duration-150"
            >
              <span className="text-xs text-zinc-400 flex items-center gap-1">
                <ArrowLeft size={12} />
                이전 글
              </span>
              <span className="text-sm font-medium text-zinc-700 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                {prevPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextPost ? (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="group flex flex-col gap-1.5 p-4 rounded-lg border border-zinc-200 hover:border-primary/40 hover:bg-zinc-50 transition-all duration-150 sm:items-end sm:text-right"
            >
              <span className="text-xs text-zinc-400 flex items-center gap-1 sm:justify-end">
                다음 글
                <ArrowRight size={12} />
              </span>
              <span className="text-sm font-medium text-zinc-700 group-hover:text-primary transition-colors duration-150 line-clamp-2">
                {nextPost.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </div>
      )}
    </article>
  );
}
