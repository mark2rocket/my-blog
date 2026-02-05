import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import { mdxComponents } from '@/components/mdx/MDXComponents';
import { format } from 'date-fns';
import { PostTracker } from '@/components/blog/PostTracker';

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
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-8 max-w-3xl">
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
              name: post.author || 'Blog Author',
              url: `${process.env.SITE_URL || 'https://example.com'}/about`,
            },
            publisher: {
              '@type': 'Organization',
              name: 'GEO-First Tech Blog',
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

      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
        <time className="text-gray-500">
          {format(new Date(post.date), 'yyyy년 MM월 dd일')}
        </time>
        {post.tags && post.tags.length > 0 && (
          <div className="mt-4 flex gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-sm bg-gray-100 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      <div className="prose prose-lg max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
