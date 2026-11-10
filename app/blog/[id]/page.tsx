import { notFound } from 'next/navigation';

const blogPosts: Record<
  string,
  {
    title: string;
    date: string;
    content: string;
  }
> = {
  'first-post': {
    title: 'First Blog Post',
    date: '2024-01-01',
    content: 'This is the content of the first blog post.',
  },
  'second-post': {
    title: 'Second Blog Post',
    date: '2024-01-15',
    content: 'This is the content of the second blog post.',
  },
};

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((id) => ({ id }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = blogPosts[id];

  if (!post) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-8">{post.date}</p>
      <div className="prose">{post.content}</div>
    </main>
  );
}
