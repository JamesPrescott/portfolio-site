import { Metadata } from 'next'
import BlogList from '@/components/BlogList'
import { getBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog - James Portfolio',
  description: 'Articles about software development, tools, and frameworks',
}

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-red-800 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Blog
            </h1>
            <p className="text-xl text-white max-w-3xl mx-auto">
              Thoughts, tutorials, and insights about software development, 
              tools, and frameworks. Sharing knowledge and experiences from my journey.
            </p>
          </div>
        </div>
      </section>

      {/* Blog List */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <BlogList posts={posts} />
        </div>
      </section>
    </div>
  )
} 