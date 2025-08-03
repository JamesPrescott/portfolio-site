import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { Calendar, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { getBlogPost, getAllPostIds } from '@/lib/blog'
import ReactMarkdown from 'react-markdown'
import { Heading, Paragraph, UnorderedList, OrderedList, ListItem, Blockquote, InlineCode, CodeBlock } from '@/components/markdown'

interface BlogPostPageProps {
  params: Promise<{
    id: string
  }>
}

export async function generateStaticParams() {
  const ids = getAllPostIds()
  return ids.map((id) => ({
    id,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogPost(id)
  
  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} - James Portfolio`,
    description: post.excerpt,
    keywords: post.tags,
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-red-800 border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/blog"
            className="inline-flex items-center text-white hover:text-red-300 mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>

          <div className="mb-6">
            <div className="flex items-center text-sm text-white mb-4">
              <Calendar size={16} className="mr-1" />
              {format(new Date(post.date), 'MMMM dd, yyyy')}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              {post.title}
            </h1>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-red-300 text-red-800 text-sm rounded-full flex items-center"
                  >
                    <Tag size={14} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <article className="prose prose-lg max-w-none prose-p:text-gray-900 prose-li:text-gray-900 prose-blockquote:text-gray-900">
            <div
              className="text-gray-900 [&>p]:text-gray-900 [&>ul]:text-gray-900 [&>ol]:text-gray-900 [&>li]:text-gray-900 [&>blockquote]:text-gray-900"
            >
              <ReactMarkdown
                components={{
                  h1: ({ children }) => <Heading level={1}>{children}</Heading>,
                  h2: ({ children }) => <Heading level={2}>{children}</Heading>,
                  h3: ({ children }) => <Heading level={3}>{children}</Heading>,
                  h4: ({ children }) => <Heading level={4}>{children}</Heading>,
                  h5: ({ children }) => <Heading level={5}>{children}</Heading>,
                  h6: ({ children }) => <Heading level={6}>{children}</Heading>,
                  p: ({ children }) => <Paragraph>{children}</Paragraph>,
                  ul: ({ children }) => <UnorderedList>{children}</UnorderedList>,
                  ol: ({ children }) => <OrderedList>{children}</OrderedList>,
                  li: ({ children }) => <ListItem>{children}</ListItem>,
                  blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
                  code: ({ children, className }) => {
                    const language = className?.replace('language-', '')
                    if (language) {
                      return <CodeBlock language={language}>{children}</CodeBlock>
                    }
                    return <InlineCode>{children}</InlineCode>
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </article>
        </div>
      </section>
    </div>
  )
} 