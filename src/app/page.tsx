import { ArrowRight } from 'lucide-react';
import { site } from '@/lib/site';
import { ServiceConcept } from '@/components/home/ServiceConcept';
import './landing.css';

const capabilities = [
  {
    title: '미디어믹스',
    description: '집중할 매체와 예산 배분의 방향을 정리합니다.',
    detail: '매체 구성 · 예산 배분 방향',
  },
  {
    title: '마케팅 전략',
    description: '사업의 목표와 고객을 바탕으로 실행 과제의 우선순위를 구체화합니다.',
    detail: '마케팅 방향 · 실행 우선순위',
  },
  {
    title: '서비스 개발',
    description: '전략을 업무에서 활용할 수 있도록 고객 환경에 맞는 서비스를 개발합니다.',
    detail: '로컬 에이전트 · Claude 연동',
  },
];

export default function HomePage() {
  return (
    <div className="landing">
      <section className="landing-container hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="hero-label">미디어믹스 · 마케팅 전략 · 로컬 에이전트</p>
          <h1 id="hero-title">
            고객 환경에서 작동하는
            <br />
            <span>마케팅 AI 에이전트.</span>
          </h1>
          <p className="hero-description">
            CPF는 미디어믹스와 마케팅 전략을 돕는 서비스를 개발하고, 고객사 로컬 환경에서
            베타테스트합니다.
          </p>
          <div className="hero-actions">
            <a className="landing-button" href={`mailto:${site.email}`}>
              베타 이용 문의 <ArrowRight size={16} aria-hidden="true" />
            </a>
            <a className="landing-text-link" href="#how-it-works">
              작동 방식 보기 <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <ServiceConcept />
      </section>

      <section className="status-strip" aria-label="베타테스트 및 개발 현황">
        <div className="landing-container status-inner">
          <p>
            <strong>{site.beta.customerCount}</strong>
            <span>과 베타테스트 중</span>
          </p>
          <p>
            <strong>Claude</strong>
            <span>연동 완료</span>
          </p>
          <p>
            <strong>고객사 로컬</strong>
            <span>환경 구축</span>
          </p>
          <span className="status-date">{site.beta.asOf} 기준</span>
        </div>
      </section>

      <section
        id="services"
        className="landing-container local-service"
        aria-labelledby="service-title"
      >
        <div className="service-heading">
          <p className="section-label">CPF의 서비스</p>
          <h2 id="service-title">
            마케팅 과제 가까이,
            <br />
            고객의 업무 환경 안에서.
          </h2>
          <p>
            고객사 로컬에 구축한 에이전트에 Claude를 연동했습니다. 미디어믹스와 마케팅 전략이 필요한
            업무를 지원합니다.
          </p>
        </div>
        <div id="how-it-works" className="working-method">
          <h3>이렇게 연결됩니다</h3>
          <ol>
            <li>
              <span aria-hidden="true">01</span>
              <div>
                <h4>마케팅 과제</h4>
                <p>매체 선택과 예산 배분, 전략 수립에 필요한 고민에서 시작합니다.</p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">02</span>
              <div>
                <h4>로컬 에이전트 · Claude 연동</h4>
                <p>고객사 환경에 구축한 에이전트로 서비스를 이용합니다.</p>
              </div>
            </li>
            <li>
              <span aria-hidden="true">03</span>
              <div>
                <h4>미디어믹스와 전략 지원</h4>
                <p>다음 마케팅 실행을 위한 방향과 우선순위를 구체화합니다.</p>
              </div>
            </li>
          </ol>
          <p className="method-note">
            서비스의 개념적 흐름입니다. 로컬 구축은 Claude 모델의 로컬 실행이나 외부 데이터 전송이
            없음을 뜻하지 않습니다.
          </p>
        </div>
      </section>

      <section className="capabilities-section" aria-labelledby="capabilities-title">
        <div className="landing-container">
          <h2 id="capabilities-title">전략과 개발을 함께 다룹니다.</h2>
          <div className="capabilities">
            {capabilities.map((item) => (
              <div key={item.title} className="capability">
                <h3>{item.title}</h3>
                <p>{item.description}</p>
                <span>{item.detail}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-container contact-section" aria-labelledby="contact-title">
        <div>
          <h2 id="contact-title">
            지금의 마케팅 과제를
            <br />
            들려주세요.
          </h2>
          <p>서비스 구성과 베타 이용, 개발 협업에 관해 문의해 주세요.</p>
        </div>
        <div className="contact-action">
          <a className="landing-button" href={`mailto:${site.email}`}>
            베타 이용 문의 <ArrowRight size={16} aria-hidden="true" />
          </a>
          <p className="contact-email">{site.email}</p>
        </div>
        <p className="demo-note">
          고객사 로컬 환경에서 제공하는 서비스로 공개 웹 데모 URL은 없습니다. 서비스 구성과 이용
          방식은 문의를 통해 안내합니다.
        </p>
      </section>
    </div>
  );
}
