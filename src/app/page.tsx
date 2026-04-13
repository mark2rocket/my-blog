import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 4);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'CPF',
            url: process.env.SITE_URL || 'https://example.com',
            description: '비즈니스 컨설팅과 깊이 있는 인사이트를 전달하는 CPF',
          }),
        }}
      />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-24 md:pt-28 md:pb-32">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="text-sm text-zinc-400 tracking-wide">Consulting & Insights</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight leading-[1.1] text-zinc-900 mb-6">
            비즈니스를 움직이는<br />
            <span className="text-primary">깊이 있는 시각</span>
          </h1>
          <p className="text-lg text-zinc-500 leading-relaxed max-w-[50ch] mb-10">
            CPF는 현장 경험에서 나온 컨설팅 인사이트를 기록합니다.
            전략, 운영, 그리고 실행에 관한 솔직한 관점.
          </p>
          <div className="flex items-center gap-5">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 bg-primary text-white text-sm font-medium px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity active:scale-[0.98] transition-transform"
            >
              인사이트 보기
            </Link>
            <Link
              href="/about"
              className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
            >
              CPF 소개 →
            </Link>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-zinc-200" />
      </div>

      {/* Recent Posts */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="flex items-baseline justify-between mb-8">
          <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
            Recent
          </span>
          <Link
            href="/blog"
            className="text-sm text-zinc-400 hover:text-primary transition-colors duration-150"
          >
            전체 보기 →
          </Link>
        </div>

        {recentPosts.length === 0 ? (
          <p className="text-zinc-400 text-sm py-12">아직 작성된 포스트가 없습니다.</p>
        ) : (
          <div className="divide-y divide-zinc-200">
            {recentPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex items-baseline justify-between gap-6 py-5 -mx-3 px-3 rounded-lg hover:bg-zinc-50 transition-colors duration-150"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-medium text-zinc-900 group-hover:text-primary transition-colors duration-150 line-clamp-1 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-zinc-400 line-clamp-1">{post.description}</p>
                </div>
                <time className="text-xs text-zinc-400 shrink-0">
                  {format(new Date(post.date), 'yyyy.MM.dd')}
                </time>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
