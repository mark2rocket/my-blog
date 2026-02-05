import Link from 'next/link';
import { getAllPosts } from '@/lib/posts';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'GEO-First Tech Blog',
            url: process.env.SITE_URL || 'https://example.com',
            description: 'Claude Code 인사이트를 담는 기술 블로그',
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${process.env.SITE_URL || 'https://example.com'}/blog?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />

      {/* Hero Section */}
      <section className="text-center mb-16">
        <h1 className="text-5xl font-bold mb-4">
          GEO-First Tech Blog
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Claude Code 인사이트를 담는 기술 블로그
        </p>
        <Link href="/blog">
          <Button size="lg">
            블로그 보기
          </Button>
        </Link>
      </section>

      {/* Recent Posts */}
      <section>
        <h2 className="text-3xl font-semibold mb-8">최근 포스트</h2>
        {recentPosts.length === 0 ? (
          <p className="text-gray-600">아직 작성된 포스트가 없습니다.</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                    <CardDescription>
                      {format(new Date(post.date), 'yyyy년 MM월 dd일')}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 line-clamp-3">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
