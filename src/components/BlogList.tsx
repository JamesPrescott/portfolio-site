'use client'

import { useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import { Calendar, Tag, Star } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { SearchInput } from './SearchInput'

interface BlogListProps {
  posts: BlogPost[]
}

const BlogList = ({ posts }: BlogListProps) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('all')

  // Get all unique tags
  const allTags = Array.from(
    new Set(posts.flatMap(post => post.tags))
  ).sort()

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesTag = selectedTag === 'all' || post.tags.includes(selectedTag)
    return matchesSearch && matchesTag
  })

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-start justify-between">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedTag === 'all'
                  ? 'bg-red-800 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All Posts
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search articles..."
          />
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
              post.featured ? 'ring-2 ring-red-800' : ''
            }`}
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="hover:text-red-800 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                {post.featured && (
                  <Star className="text-yellow-500 ml-2 flex-shrink-0" size={20} fill="currentColor" />
                )}
              </div>

              <div className="flex items-center text-sm text-gray-500 mb-3">
                <Calendar size={16} className="mr-1" />
                {format(new Date(post.date), 'MMM dd, yyyy')}
              </div>

              <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full flex items-center"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/blog/${post.id}`}
                className="inline-flex items-center text-red-800 hover:text-red-700 font-medium transition-colors"
              >
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default BlogList 