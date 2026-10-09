import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';

const services = [
  { title: '미디어믹스', description: '어떤 매체에 집중할지, 예산을 어떻게 나눌지. 마케팅 실행의 출발점이 되는 매체 구성과 배분 방향을 다룹니다.' },
  { title: '마케팅 전략', description: '사업의 목표와 고객을 바탕으로 마케팅 방향을 정리하고, 실행할 과제의 우선순위를 구체화합니다.' },
  { title: '서비스 개발', description: '전략을 실제 업무에서 활용할 수 있도록 마케팅 서비스를 개발하고 고객과 함께 테스트합니다.' },
];

export default function HomePage() {
  return (
    <div>
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-16 md:pt-20 md:pb-24">
        <p className="text-sm font-semibold text-primary mb-6">마케팅 전략 · 미디어믹스 · 개발</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.2] text-zinc-900 mb-6">
          마케팅의 다음 실행을,<br />구체적인 서비스로.
        </h1>
        <p className="text-lg text-zinc-600 leading-relaxed max-w-2xl mb-8">
          CPF는 미디어믹스와 마케팅 전략을 수립하고,<br className="hidden sm:block" /> 이를 활용하는 서비스를 개발합니다.
        </p>
        <a href="#services" className="inline-flex min-h-11 items-center gap-3 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-white">
          서비스 살펴보기 <ArrowRight size={16} aria-hidden="true" />
        </a>
      </section>

      <section aria-label="현재 서비스 단계" className="border-y border-zinc-200 bg-zinc-50">
        <div className="max-w-6xl mx-auto px-6 py-8 grid gap-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div>
            <p className="text-sm font-semibold text-primary mb-2">{site.beta.stage}</p>
            <p className="text-3xl font-bold text-zinc-900">{site.beta.customerCount}의 고객과 함께</p>
          </div>
          <div className="text-zinc-600 leading-relaxed">
            <p>현재 마케팅 서비스를 개발하며 베타테스트를 진행하고 있습니다. 고객이 실제로 사용하는 과정에서 서비스의 활용성을 확인하고 있습니다.</p>
            <p className="mt-2 text-sm">{site.beta.asOf} 기준 베타테스트 참여 규모입니다.</p>
          </div>
        </div>
      </section>

      <section id="services" className="max-w-6xl mx-auto px-6 py-16 md:py-20 scroll-mt-24">
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">전략에서 개발까지 이어지는 일</h2>
        <p className="text-zinc-600 leading-relaxed max-w-2xl mb-10">매체 선택과 마케팅 방향을 고민하는 사업자와 마케팅 담당자를 위한 서비스를 만들고 있습니다.</p>
        <div className="border-t border-zinc-200">
          {services.map((service) => (
            <div key={service.title} className="grid gap-3 md:grid-cols-[1fr_2fr] md:gap-16 py-8 border-b border-zinc-200">
              <h3 className="text-xl font-semibold text-zinc-900">{service.title}</h3>
              <p className="max-w-2xl text-zinc-600 leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20" aria-labelledby="local-service-title">
        <h2 id="local-service-title" className="text-3xl font-bold tracking-tight text-zinc-900 mb-4">고객사 환경에서 사용하는 로컬 에이전트</h2>
        <p className="text-zinc-600 leading-relaxed max-w-2xl mb-8">고객사 로컬에 구축한 에이전트에 Claude를 연동했습니다. 미디어믹스와 마케팅 전략을 다루는 서비스 개발의 일부로, 실제 고객 환경에서 베타테스트를 진행하고 있습니다.</p>
        <dl className="grid sm:grid-cols-2 gap-8 bg-zinc-50 border border-zinc-200 rounded-xl p-6 md:p-8">
          <div><dt className="font-semibold text-zinc-900 mb-2">제공 방식</dt><dd className="text-zinc-600 leading-relaxed">고객사 로컬 환경에 구축하는 서비스</dd></div>
          <div><dt className="font-semibold text-zinc-900 mb-2">Claude 연동 상태</dt><dd className="text-zinc-600 leading-relaxed">에이전트 연동 완료 · 고객 베타테스트 중</dd></div>
        </dl>
        <p className="text-sm text-zinc-600 leading-relaxed mt-4">로컬 환경에서 사용하는 서비스로, 공개 웹 데모 URL은 제공하지 않습니다. 서비스 구성과 이용 방식은 문의를 통해 안내합니다.</p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 md:pb-20">
        <div className="rounded-xl bg-primary/5 p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 mb-4">지금 고민하는 마케팅 과제가 있나요?</h2>
          <p className="text-zinc-600 leading-relaxed max-w-2xl mb-6">미디어믹스, 마케팅 전략, 개발 또는 베타테스트에 관해 문의해 주세요. 현재의 과제와 필요한 내용을 이메일로 알려주시면 됩니다.</p>
          <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2 text-primary font-semibold break-all">
            {site.email} <ArrowRight size={16} aria-hidden="true" className="shrink-0" />
          </a>
        </div>
        <Link href="/about" className="inline-flex min-h-11 items-center mt-6 text-sm text-zinc-600 underline underline-offset-4">CPF와 운영자 소개</Link>
      </section>
    </div>
  );
}
