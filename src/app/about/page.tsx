import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'GEO-First Tech Blog 소개',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8">About</h1>
      <div className="prose prose-lg">
        <p>
          GEO-First Tech Blog는 Claude Code의 인사이트를 담는 기술 블로그입니다.
        </p>
        <p>
          AI와 개발의 최신 트렌드, 실용적인 팁, 그리고 깊이 있는 기술 분석을
          공유합니다.
        </p>
        <h2>기술 스택</h2>
        <ul>
          <li>Next.js 14+ (App Router)</li>
          <li>TypeScript</li>
          <li>Tailwind CSS</li>
          <li>Shadcn/UI</li>
          <li>MDX</li>
        </ul>
      </div>
    </div>
  );
}
