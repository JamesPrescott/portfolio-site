'use client'

import { useState } from 'react'
import { ExternalLink, Github, Star } from 'lucide-react'
import { SearchInput } from './SearchInput'

export interface ShowcaseItem {
  id: number
  title: string
  description: string
  category: 'tool' | 'framework'
  tags: string[]
  image: string
  demoUrl: string
  githubUrl: string
  featured: boolean
}

interface ShowcaseGridProps {
  items: ShowcaseItem[]
}

const ShowcaseGrid = ({ items }: ShowcaseGridProps) => {
  const [filter, setFilter] = useState<'all' | 'tool' | 'framework'>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredItems = items.filter(item => {
    const matchesFilter = filter === 'all' || item.category === filter
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesFilter && matchesSearch
  })

  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'tool', label: 'Tools' },
    { value: 'framework', label: 'Frameworks' },
  ]

  return (
    <div>
      {/* Filters */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2">
            {categories.map((category) => (
              <button
                key={category.value}
                onClick={() => setFilter(category.value as 'all' | 'tool' | 'framework')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  filter === category.value
                    ? 'bg-red-800 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
          <SearchInput
            value={searchTerm}
            onChange={setSearchTerm}
            placeholder="Search projects..."
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow ${
              item.featured ? 'ring-2 ring-red-800' : ''
            }`}
          >
            {/* Image */}
            <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-gray-400 text-sm">Project Image</div>
            </div>

            {/* Content */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                {item.featured && (
                  <Star className="text-yellow-500" size={20} fill="currentColor" />
                )}
              </div>
              
              <p className="text-gray-600 mb-4 line-clamp-3">{item.description}</p>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-800 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                >
                  <ExternalLink size={16} />
                  Demo
                </a>
                <a
                  href={item.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Github size={16} />
                  Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  )
}

export default ShowcaseGrid 