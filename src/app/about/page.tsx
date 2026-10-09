import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: '사업 소개',
  description: `${site.legalName}(CPF)의 사업 내용, 개발 단계와 운영자 정보입니다.`,
  alternates: { canonical: '/about' },
};

export default function AboutPage() {
  const details = [
    ['사업자 상호', `${site.legalName} (${site.name})`],
    ['대표자', site.operator],
    ['개업일', site.founded],
    ['소재지', site.location],
    ['공식 웹사이트', new URL(site.url).hostname],
  ];

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
      <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-8">마케팅을 구체화하는 CPF</h1>
      <p className="text-lg text-zinc-600 leading-relaxed mb-6">씨피에프(CPF)는 미디어믹스와 마케팅 전략 수립, 그리고 이를 활용하는 서비스 개발을 진행하고 있습니다.</p>
      <p className="text-zinc-600 leading-relaxed mb-12">어떤 매체에 집중할지, 무엇부터 실행할지 고민하는 사업자와 마케팅 담당자를 위해 전략과 개발을 연결합니다.</p>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-4">현재 단계</h2>
        <p className="text-zinc-600 leading-relaxed">마케팅 서비스를 개발하고 있으며, {site.beta.customerCount}의 고객이 베타테스트에 참여하고 있습니다. ({site.beta.asOf} 기준)</p>
        <p className="text-zinc-600 leading-relaxed mt-3">고객사 로컬에 구축한 에이전트에 Claude를 연동해 사용하고 있습니다. 로컬 서비스이므로 공개 웹 데모 URL은 없으며, 서비스 이용이나 베타테스트에 관한 내용은 이메일로 문의해 주세요.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-zinc-900 mb-6">사업자 정보</h2>
        <dl className="border-t border-zinc-200">
          {details.map(([label, value]) => (
            <div key={label} className="grid grid-cols-[7rem_1fr] gap-4 border-b border-zinc-200 py-4 text-sm">
              <dt className="text-zinc-600">{label}</dt><dd className="font-medium text-zinc-900 break-words">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="text-sm text-zinc-600 leading-relaxed mt-5">CPF는 씨피에프의 영문 표기이며, amkim.co는 CPF의 사업과 서비스를 소개하는 공식 웹사이트입니다.</p>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-zinc-900 mb-3">문의</h2>
        <p className="text-zinc-600 mb-3">서비스 문의, 개발 협업 및 베타테스트 관련 연락을 받습니다.</p>
        <a href={`mailto:${site.email}`} className="inline-flex items-center min-h-11 text-primary font-semibold break-all">{site.email}</a>
      </section>
    </div>
  );
}
