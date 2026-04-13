import { Metadata } from 'next';

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

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-12">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          About
        </span>
        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mt-3 mb-5 text-zinc-900">
          CPF란
        </h1>
        <div className="w-8 h-0.5 bg-primary" />
      </div>

      <div className="space-y-5 text-zinc-600 leading-relaxed">
        <p className="text-lg text-zinc-700">
          CPF는 현장 경험에서 축적된 비즈니스 컨설팅 인사이트를 정리하고 공유하는 공간입니다.
        </p>
        <p>
          전략 수립부터 실행까지, 실제 현장에서 마주한 문제들과 그 해결 과정을 기록합니다.
          숫자와 프레임워크 너머의 솔직한 관점을 담습니다.
        </p>

        <div className="pt-8 border-t border-zinc-200">
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-400 mb-5">
            다루는 주제
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3 gap-x-4">
            {topics.map((topic) => (
              <div key={topic} className="flex items-center gap-2 text-sm text-zinc-600">
                <span className="w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                {topic}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
