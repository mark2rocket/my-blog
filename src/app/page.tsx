import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { TrendingUp, Target, BookOpen, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: TrendingUp,
    title: '전략 컨설팅',
    desc: '데이터와 현장 경험을 결합한 실질적인 비즈니스 전략을 설계합니다.',
  },
  {
    icon: Target,
    title: '실행 최적화',
    desc: '전략을 현장에서 작동하게 만드는 운영 효율화 방법론을 공유합니다.',
  },
  {
    icon: BookOpen,
    title: '인사이트 아카이브',
    desc: '누적된 컨설팅 경험에서 추출한 솔직하고 실용적인 관점을 기록합니다.',
  },
];

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

      {/* Hero — Split layout */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 md:pt-24 md:pb-28">
        <div className="grid md:grid-cols-[58fr_42fr] gap-14 items-center">
          {/* Left: text */}
          <div>
            <div className="flex items-center gap-2 mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-sm text-zinc-400 tracking-wide">Consulting & Insights</span>
            </div>
            <h1 className="text-5xl md:text-[3.75rem] font-black tracking-tight leading-[1.08] text-zinc-900 mb-6">
              비즈니스를<br />
              움직이는<br />
              <span className="text-primary">깊이 있는 시각</span>
            </h1>
            <p className="text-lg text-zinc-500 leading-relaxed max-w-[46ch] mb-10">
              CPF는 현장 경험에서 나온 컨설팅 인사이트를 기록합니다.
              전략, 운영, 그리고 실행에 관한 솔직한 관점.
            </p>
            <div className="flex items-center gap-5">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity active:scale-[0.98]"
              >
                인사이트 보기
                <ArrowRight size={15} />
              </Link>
              <Link
                href="/about"
                className="text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150"
              >
                CPF 소개 →
              </Link>
            </div>
          </div>

          {/* Right: hero image */}
          <div className="relative hidden md:block">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl shadow-zinc-200/80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/cpf-hero/600/800"
                alt="CPF Consulting"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/8" />
            </div>
            {/* Decorative accents */}
            <div className="absolute -bottom-5 -left-5 w-28 h-28 rounded-2xl bg-primary/8 -z-10" />
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-xl bg-zinc-100 -z-10" />
          </div>
        </div>
      </section>

      {/* Feature strip */}
      <section className="border-y border-zinc-200 bg-zinc-50/70">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-zinc-200">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <div key={i} className="px-0 md:px-8 py-6 md:py-0 first:pl-0 last:pr-0">
                  <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon size={18} className="text-primary" />
                  </div>
                  <h3 className="text-base font-bold text-zinc-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Image highlight section */}
      <section className="max-w-6xl mx-auto px-6 py-16 md:py-20">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl overflow-hidden aspect-square">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/cpf-office/400/400"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square mt-6">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/cpf-strategy/400/400"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="rounded-xl overflow-hidden aspect-square col-span-2 h-36">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://picsum.photos/seed/cpf-team/800/300"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:pl-6">
            <span className="text-xs font-medium uppercase tracking-widest text-primary mb-4 block">
              About CPF
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 mb-5 leading-tight">
              경험에서 나온<br />진짜 인사이트
            </h2>
            <p className="text-zinc-500 leading-relaxed mb-6">
              이론이 아닌 현장. 수십 개의 프로젝트를 통해 검증된 관점과 방법론을
              CPF에서 직접 확인하세요.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:opacity-80 transition-opacity"
            >
              자세히 알아보기 <ArrowRight size={14} />
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
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
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
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-primary transition-colors duration-150 line-clamp-1 mb-1">
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
