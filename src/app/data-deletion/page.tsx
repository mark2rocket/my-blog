import { Metadata } from 'next';
import { Mail, Trash2, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '데이터 삭제 요청',
  description: 'amkim.co 데이터 삭제 요청',
  robots: {
    index: false,
    follow: false,
  },
};

const steps = [
  {
    icon: Mail,
    title: '이메일로 요청',
    desc: 'kimsaeam@amkim.co 로 삭제 요청 이메일을 보내주세요.',
  },
  {
    icon: Clock,
    title: '7영업일 이내 처리',
    desc: '요청 접수 후 7영업일 이내에 해당 데이터를 삭제합니다.',
  },
  {
    icon: CheckCircle,
    title: '처리 결과 통보',
    desc: '삭제 완료 후 요청하신 이메일로 처리 결과를 안내드립니다.',
  },
];

export default function DataDeletionPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-5 text-zinc-900">
          데이터 삭제 요청
        </h1>
        <div className="w-8 h-0.5 bg-primary" />
        <p className="mt-4 text-sm text-zinc-400">최종 업데이트: 2026년 4월 26일</p>
      </div>

      <div className="space-y-10 text-zinc-600 leading-[1.9]">

        <section>
          <p className="text-zinc-700">
            amkim.co 서비스 이용 과정에서 수집된 귀하의 개인정보(회사명, 이름, 전화번호, 이메일)에 대해
            언제든지 삭제를 요청하실 수 있습니다. 아래 절차에 따라 요청해 주시면 신속하게 처리하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-5">삭제 요청 절차</h2>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-200">
                <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                  <step.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-800 mb-0.5">
                    {i + 1}. {step.title}
                  </p>
                  <p className="text-sm text-zinc-500">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">이메일 작성 안내</h2>
          <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 text-sm space-y-2">
            <p className="font-semibold text-zinc-700">이메일에 아래 내용을 포함해 주세요.</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-500">
              <li>제목: <span className="font-mono">[데이터 삭제 요청] 성함</span></li>
              <li>삭제를 요청하는 본인의 이름</li>
              <li>서비스 이용 시 등록한 이메일 주소</li>
              <li>삭제를 원하는 데이터 항목 (전체 또는 일부)</li>
            </ul>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">삭제 범위</h2>
          <p className="mb-3">삭제 요청이 접수되면 아래 항목이 모두 삭제됩니다.</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>회사명</li>
            <li>이름</li>
            <li>전화번호</li>
            <li>이메일 주소</li>
          </ul>
          <p className="mt-4 text-sm text-zinc-500">
            단, 관계 법령에 따라 일정 기간 보존 의무가 있는 정보는 해당 기간 경과 후 삭제됩니다.
            자세한 내용은{' '}
            <a
              href="/privacy-policy"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              개인정보처리방침
            </a>
            을 확인해 주세요.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">문의</h2>
          <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 text-sm space-y-1.5">
            <p><span className="font-semibold text-zinc-700">개인정보 보호책임자:</span> 김새암</p>
            <p>
              <span className="font-semibold text-zinc-700">이메일:</span>{' '}
              <a
                href="mailto:kimsaeam@amkim.co"
                className="text-primary hover:opacity-80"
              >
                kimsaeam@amkim.co
              </a>
            </p>
            <p className="text-zinc-400 pt-1">요청 접수 후 지체 없이 답변 드리겠습니다.</p>
          </div>
        </section>

      </div>
    </div>
  );
}
