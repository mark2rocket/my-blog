import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'CPF 인사이트 — 비즈니스 컨설팅과 전략에 관한 글',
};

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-12">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Insights
        </span>
        <h1 className="text-4xl font-bold tracking-tight mt-3 text-zinc-900">Blog</h1>
      </div>

      {posts.length === 0 ? (
        <div className="py-16 border-t border-zinc-200 text-center">
          <p className="text-zinc-400 text-sm mb-4">아직 작성된 포스트가 없습니다.</p>
          <Link
            href="/about"
            className="text-sm text-primary hover:opacity-80 transition-opacity"
          >
            CPF 소개 먼저 보기 →
          </Link>
        </div>
      ) : (
        <div className="divide-y divide-zinc-200">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-8 -mx-3 px-3 rounded-lg hover:bg-zinc-50 transition-colors duration-150"
            >
              <div className="flex items-start justify-between gap-8">
                <div className="flex-1 min-w-0">
                  <h2 className="text-xl font-bold tracking-tight text-zinc-900 group-hover:text-primary transition-colors duration-150 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-zinc-500 leading-relaxed line-clamp-2 mb-3">
                    {post.description}
                  </p>
                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
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
                </div>
                <time className="text-xs text-zinc-400 shrink-0 pt-1">
                  {format(new Date(post.date), 'yyyy.MM.dd')}
                </time>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
