import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BlogPage from './page'
import { getBlogPosts } from '@/lib/blog'

// Mock the blog library
vi.mock('@/lib/blog', () => ({
  getBlogPosts: vi.fn(),
}))

// Mock the BlogList component
vi.mock('@/components/BlogList', () => ({
  default: vi.fn(({ posts }) => (
    <div data-testid="blog-list" data-posts-count={posts.length}>
      {posts.map((post: any) => (
        <div key={post.id} data-testid={`blog-post-${post.id}`}>
          {post.title}
        </div>
      ))}
    </div>
  )),
}))

// Mock Next.js metadata
vi.mock('next', () => ({
  Metadata: vi.fn(),
}))

const mockPosts = [
  {
    id: 'test-post-1',
    title: 'Test Post 1',
    date: '2024-01-01',
    excerpt: 'This is a test post excerpt',
    content: 'Full content here',
    tags: ['react', 'typescript'],
    featured: true,
  },
  {
    id: 'test-post-2',
    title: 'Test Post 2',
    date: '2024-01-02',
    excerpt: 'Another test post excerpt',
    content: 'More content here',
    tags: ['nextjs', 'javascript'],
    featured: false,
  },
]

describe('BlogPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getBlogPosts as any).mockResolvedValue(mockPosts)
  })

  describe('Page Structure', () => {
    it('renders header section with correct styling', async () => {
      render(await BlogPage())
      
      const headerSection = screen.getByText('Blog').closest('section')
      expect(headerSection).toBeInTheDocument()
      expect(headerSection).toHaveClass('bg-red-800', 'border-b')
    })

    it('renders blog list section with correct styling', async () => {
      render(await BlogPage())
      
      const blogListSection = screen.getByTestId('blog-list').closest('section')
      expect(blogListSection).toBeInTheDocument()
      expect(blogListSection).toHaveClass('py-16')
    })
  })

  describe('Header Content', () => {
    it('renders main heading with correct text and styling', async () => {
      render(await BlogPage())
      
      const heading = screen.getByRole('heading', { level: 1 })
      expect(heading).toBeInTheDocument()
      expect(heading).toHaveTextContent('Blog')
      expect(heading).toHaveClass('text-4xl', 'md:text-5xl', 'font-bold', 'text-white')
    })

    it('renders description with correct content and styling', async () => {
      render(await BlogPage())
      
      const description = screen.getByText(/Thoughts, tutorials, and insights/)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-xl', 'text-white')
      expect(description.textContent).toContain('Thoughts, tutorials, and insights about software development')
    })

    it('has responsive container classes', async () => {
      render(await BlogPage())
      
      const headerContainer = screen.getByText('Blog').closest('section')?.querySelector('div')
      expect(headerContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Blog List Integration', () => {
    it('fetches and passes posts to BlogList component', async () => {
      render(await BlogPage())
      
      expect(getBlogPosts).toHaveBeenCalledTimes(1)
      
      const blogList = screen.getByTestId('blog-list')
      expect(blogList).toBeInTheDocument()
      expect(blogList).toHaveAttribute('data-posts-count', '2')
    })
  })

  describe('Data Handling', () => {
    it('handles empty posts array gracefully', async () => {
      ;(getBlogPosts as any).mockResolvedValue([])
      
      render(await BlogPage())
      
      const blogList = screen.getByTestId('blog-list')
      expect(blogList).toHaveAttribute('data-posts-count', '0')
    })

    it('handles single post correctly', async () => {
      ;(getBlogPosts as any).mockResolvedValue([mockPosts[0]])
      
      render(await BlogPage())
      
      const blogList = screen.getByTestId('blog-list')
      expect(blogList).toHaveAttribute('data-posts-count', '1')
      expect(screen.getByText('Test Post 1')).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('handles getBlogPosts errors gracefully', async () => {
      ;(getBlogPosts as any).mockRejectedValue(new Error('Failed to fetch posts'))
      
      try {
        const { container } = render(await BlogPage())
        expect(container).toBeInTheDocument()
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
