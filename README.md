# GEO-First Tech Blog

Claude Code 인사이트를 담는 기술 블로그

## 기술 스택

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Shadcn/UI
- **Content:** MDX (next-mdx-remote)
- **Analytics:** Mixpanel

## 시작하기

### 필수 조건

- Node.js 18+
- npm

### 설치

```bash
npm install
```

### 환경 변수 설정

`.env.local` 파일을 생성하고 다음 변수를 설정하세요:

```
NEXT_PUBLIC_MIXPANEL_TOKEN=your_mixpanel_token
SITE_URL=https://your-domain.com
```

### 개발 서버 실행

```bash
npm run dev
```

http://localhost:3000 에서 확인하세요.

### 빌드

```bash
npm run build
```

### 프로덕션 실행

```bash
npm run start
```

## 블로그 포스트 작성

`src/content/posts/` 디렉토리에 `.mdx` 파일을 생성하세요.

### Frontmatter 예시

```yaml
---
title: "포스트 제목"
date: "2024-01-01"
description: "포스트 설명"
tags: ["tag1", "tag2"]
---
```

## 프로젝트 구조

```
src/
├── app/                  # Next.js App Router
│   ├── blog/            # 블로그 페이지
│   ├── about/           # 소개 페이지
│   └── layout.tsx       # 루트 레이아웃
├── components/          # React 컴포넌트
│   ├── layout/          # 레이아웃 컴포넌트
│   ├── mdx/             # MDX 컴포넌트
│   ├── providers/       # Context Providers
│   └── ui/              # Shadcn/UI 컴포넌트
├── content/
│   └── posts/           # MDX 블로그 포스트
├── hooks/               # Custom React Hooks
└── lib/                 # 유틸리티 함수
```

## 라이선스

MIT
