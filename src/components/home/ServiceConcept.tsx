'use client';

import { useState } from 'react';
import './ServiceConcept.css';

const nodes = [
  {
    title: '마케팅 과제',
    subtitle: '매체 선택과 전략의 고민',
    description: '어떤 매체에 집중할지, 어떤 마케팅 과제부터 실행할지 고민하는 데서 출발합니다.',
  },
  {
    title: '고객사 로컬 에이전트',
    subtitle: 'Claude 연동',
    description:
      '고객사 로컬에 구축한 에이전트에 Claude를 연동했습니다. Claude 모델 자체의 로컬 실행을 의미하지 않습니다.',
  },
  {
    title: '미디어믹스 · 마케팅 전략',
    subtitle: '다음 실행을 위한 지원',
    description: '매체 구성과 예산 배분 방향, 마케팅 전략 수립을 돕는 서비스입니다.',
  },
];

export function ServiceConcept() {
  const [selected, setSelected] = useState(0);

  return (
    <figure className="service-concept" aria-labelledby="concept-caption">
      <figcaption id="concept-caption">
        <span>서비스 개념도</span>
        <span className="concept-hint">노드를 선택해 살펴보세요</span>
      </figcaption>
      <div className="concept-flow">
        {nodes.map((node, index) => (
          <div className="concept-step" key={node.title}>
            {index > 0 && (
              <svg className={`concept-line line-${index}`} viewBox="0 0 2 32" aria-hidden="true">
                <path d="M1 0 V32" pathLength="1" />
              </svg>
            )}
            <button
              type="button"
              className={`concept-node node-${index}`}
              aria-pressed={selected === index}
              aria-describedby={selected === index ? 'concept-description' : undefined}
              onClick={() => setSelected(index)}
              onFocus={() => setSelected(index)}
              onMouseEnter={() => setSelected(index)}
            >
              <span className="concept-marker" aria-hidden="true">
                {index + 1}
              </span>
              <span>
                <strong>{node.title}</strong>
                <span className="node-subtitle">{node.subtitle}</span>
              </span>
              <span className="node-select" aria-hidden="true">
                ↗
              </span>
            </button>
          </div>
        ))}
      </div>
      <p id="concept-description" className="concept-description">
        {nodes[selected].description}
      </p>
      <p className="concept-disclaimer">
        서비스 이해를 위한 개념도이며, 실제 제품 화면이나 기술 아키텍처가 아닙니다.
      </p>
    </figure>
  );
}
