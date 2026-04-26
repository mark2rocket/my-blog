import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '개인정보처리방침',
  description: 'amkim.co 개인정보처리방침',
  robots: {
    index: false,
    follow: false,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
      <div className="mb-10">
        <span className="text-xs font-medium uppercase tracking-widest text-zinc-400">
          Legal
        </span>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mt-3 mb-5 text-zinc-900">
          개인정보처리방침
        </h1>
        <div className="w-8 h-0.5 bg-primary" />
        <p className="mt-4 text-sm text-zinc-400">최종 업데이트: 2026년 4월 26일</p>
      </div>

      <div className="space-y-10 text-zinc-600 leading-[1.9]">

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">1. 개요</h2>
          <p>
            amkim.co(이하 "서비스")를 운영하는 김새암(이하 "운영자")은 이용자의 개인정보를 중요하게 여기며,
            「개인정보 보호법」 및 관계 법령을 준수합니다. 본 방침은 운영자가 수집하는 개인정보의 항목,
            수집 목적, 이용 방법, 보유 기간 및 삭제 절차를 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">2. 수집하는 개인정보 항목</h2>
          <p className="mb-3">운영자는 서비스 이용 및 문의 처리를 위해 다음 항목을 수집합니다.</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-zinc-200 rounded-lg">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">구분</th>
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">수집 항목</th>
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">필수 여부</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2.5 border border-zinc-200">문의·상담</td>
                  <td className="px-4 py-2.5 border border-zinc-200">회사명, 이름, 전화번호, 이메일 주소</td>
                  <td className="px-4 py-2.5 border border-zinc-200">필수</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">3. 개인정보 수집 및 이용 목적</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>문의·상담 요청에 대한 응답 및 후속 처리</li>
            <li>서비스 개선을 위한 이용 현황 분석</li>
            <li>법령상 의무 이행</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">4. 개인정보 보유 및 이용 기간</h2>
          <p>
            수집된 개인정보는 수집 목적이 달성된 날로부터 <strong className="text-zinc-800">1년</strong> 이내에
            지체 없이 파기합니다. 단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보유합니다.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">근거 법령</th>
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">보유 기간</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2.5 border border-zinc-200">전자상거래 소비자 보호법 — 계약·청약철회 기록</td>
                  <td className="px-4 py-2.5 border border-zinc-200">5년</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 border border-zinc-200">전자상거래 소비자 보호법 — 소비자 불만·분쟁처리 기록</td>
                  <td className="px-4 py-2.5 border border-zinc-200">3년</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">5. 개인정보의 제3자 제공</h2>
          <p>
            운영자는 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.
            다만, 이용자의 사전 동의가 있거나 법령에 의해 요구되는 경우에는 예외로 합니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">6. 개인정보 처리 위탁</h2>
          <p>
            운영자는 서비스 운영에 필요한 범위 내에서 아래와 같이 개인정보 처리를 위탁하고 있습니다.
          </p>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full text-sm border-collapse border border-zinc-200">
              <thead>
                <tr className="bg-zinc-50">
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">수탁업체</th>
                  <th className="text-left px-4 py-2.5 border border-zinc-200 font-semibold text-zinc-700">위탁 업무</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-2.5 border border-zinc-200">Vercel Inc.</td>
                  <td className="px-4 py-2.5 border border-zinc-200">웹 서비스 호스팅 및 인프라 운영</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">7. 이용자의 권리</h2>
          <p className="mb-3">이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul className="list-disc pl-5 space-y-1.5 text-sm">
            <li>개인정보 열람 요청</li>
            <li>개인정보 정정·삭제 요청</li>
            <li>개인정보 처리 정지 요청</li>
          </ul>
          <p className="mt-3 text-sm">
            권리 행사는 아래 개인정보 보호책임자에게 이메일로 요청하시면 지체 없이 처리합니다.
            데이터 삭제 요청은{' '}
            <a
              href="/data-deletion"
              className="text-primary underline underline-offset-2 hover:opacity-80"
            >
              데이터 삭제 요청 페이지
            </a>
            를 이용하실 수도 있습니다.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">8. 개인정보 보호책임자</h2>
          <div className="bg-zinc-50 rounded-xl p-5 border border-zinc-200 text-sm space-y-1.5">
            <p><span className="font-semibold text-zinc-700">성명:</span> 김새암</p>
            <p>
              <span className="font-semibold text-zinc-700">이메일:</span>{' '}
              <a
                href="mailto:kimsaeam@amkim.co"
                className="text-primary hover:opacity-80"
              >
                kimsaeam@amkim.co
              </a>
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-base font-bold text-zinc-900 mb-3">9. 방침 변경 안내</h2>
          <p>
            본 개인정보처리방침은 법령·정책의 변경이나 서비스 내용에 따라 개정될 수 있습니다.
            변경 시 웹사이트를 통해 사전 공지하며, 변경 사항은 공지 후 7일이 지난 날부터 효력이 발생합니다.
          </p>
        </section>

      </div>
    </div>
  );
}
