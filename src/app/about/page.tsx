import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About',
  description: 'CPF 소개 — 비즈니스 컨설팅과 인사이트',
};

const topics = [
  '비즈니스 전략',
  '조직 운영',
  '의사결정',
  '실행 방법론',
  '시장 분석',
  '성장 전략',
];

const stats = [
  { value: '10+', label: '년 컨설팅 경력' },
  { value: '50+', label: '프로젝트 수행' },
  { value: '다양한', label: '산업 경험' },
];

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      {/* Title */}
      <div className="mb-12">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          About
        </span>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-3 mb-5 text-zinc-900">
          CPF란
        </h1>
        <div className="w-8 h-0.5 bg-primary" />
      </div>

      {/* Intro */}
      <div className="space-y-5 text-zinc-600 leading-[1.9] mb-12">
        <p className="text-lg text-zinc-700">
          CPF는 현장 경험에서 축적된 비즈니스 컨설팅 인사이트를 정리하고 공유하는 공간입니다.
        </p>
        <p>
          전략 수립부터 실행까지, 실제 현장에서 마주한 문제들과 그 해결 과정을 기록합니다.
          이론보다 현장, 프레임워크보다 맥락을 중시하는 솔직한 관점을 담습니다.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 py-8 mb-12 border-y border-zinc-200">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-2xl font-bold text-zinc-900 mb-1">{stat.value}</div>
            <div className="text-xs text-zinc-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Topics */}
      <div className="mb-12">
        <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-5">
          다루는 주제
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
          {topics.map((topic) => (
            <div key={topic} className="flex items-center gap-2 text-sm text-zinc-600">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {topic}
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div className="bg-zinc-50 rounded-xl p-6 border border-zinc-200 mb-8">
        <h2 className="text-base font-bold text-zinc-900 mb-2">함께 일하고 싶으시다면</h2>
        <p className="text-sm text-zinc-500 mb-4 leading-relaxed">
          컨설팅 문의, 협업 제안, 또는 글에 대한 피드백을 언제든 환영합니다.
        </p>
        <a
          href="mailto:contact@cpf.kr"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80 transition-opacity duration-150"
        >
          <Mail size={14} />
          contact@cpf.kr
        </a>
      </div>

      {/* CTA */}
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-md hover:opacity-90 transition-opacity active:scale-[0.98]"
      >
        인사이트 읽기
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
