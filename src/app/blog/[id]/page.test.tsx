import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BlogPostPage from './page'
import { getBlogPost, getAllPostIds } from '@/lib/blog'
import { format } from 'date-fns'

// Mock the blog library
vi.mock('@/lib/blog', () => ({
  getBlogPost: vi.fn(),
  getAllPostIds: vi.fn(),
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: any) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// Mock ReactMarkdown
vi.mock('react-markdown', () => ({
  default: ({ children, components }: any) => {
    // Simple mock that renders the content as-is for testing
    return <div data-testid="markdown-content">{children}</div>
  },
}))

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: vi.fn(() => <div data-testid="calendar-icon" />),
  Tag: vi.fn(() => <div data-testid="tag-icon" />),
  ArrowLeft: vi.fn(() => <div data-testid="arrow-left-icon" />),
}))

// Mock date-fns
vi.mock('date-fns', () => ({
  format: vi.fn((date) => 'January 15, 2024'),
}))

// Mock markdown components
vi.mock('@/components/markdown', () => ({
  Heading: ({ children, level }: any) => (
    <div data-testid={`heading-${level}`}>{children}</div>
  ),
  Paragraph: ({ children }: any) => (
    <div data-testid="paragraph">{children}</div>
  ),
  UnorderedList: ({ children }: any) => (
    <ul data-testid="unordered-list">{children}</ul>
  ),
  OrderedList: ({ children }: any) => (
    <ol data-testid="ordered-list">{children}</ol>
  ),
  ListItem: ({ children }: any) => (
    <li data-testid="list-item">{children}</li>
  ),
  Blockquote: ({ children }: any) => (
    <blockquote data-testid="blockquote">{children}</blockquote>
  ),
  InlineCode: ({ children }: any) => (
    <code data-testid="inline-code">{children}</code>
  ),
  CodeBlock: ({ children, language }: any) => (
    <pre data-testid="code-block" data-language={language}>{children}</pre>
  ),
}))

const mockPost = {
  id: 'building-modern-tools',
  title: 'Building Modern Development Tools',
  date: '2024-01-15T00:00:00.000Z',
  excerpt: 'A deep dive into creating developer tools that improve productivity and developer experience.',
  content: `
# Building Modern Development Tools

In today's fast-paced development environment, having the right tools can make the difference between a productive day and a frustrating one.

## Why Developer Tools Matter

Developer tools are more than just utilities—they're the foundation of our daily workflow.

- **Save time** by automating repetitive tasks
- **Reduce errors** by providing consistent processes

## Key Principles

### 1. Start with Real Problems

The best tools solve actual problems that developers face daily.

### 2. Focus on Developer Experience

A tool is only as good as its user experience.

\`\`\`typescript
const program = new Command()
program.name('create-project')
\`\`\`

## Conclusion

Building developer tools is both challenging and rewarding.
  `,
  tags: ['Tools', 'Productivity', 'Developer Experience', 'CLI'],
  featured: true,
}

describe('BlogPostPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    ;(getBlogPost as any).mockResolvedValue(mockPost)
    ;(getAllPostIds as any).mockReturnValue(['building-modern-tools', 'react-framework-design'])
  })

  describe('Page Rendering', () => {
    it('renders the blog post page with correct structure', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('renders the page title correctly', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.getByText('Building Modern Development Tools')).toBeInTheDocument()
    })
  })

  describe('Header Section', () => {
    it('renders back to blog link with correct styling', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      const backLink = screen.getByText('Back to Blog')
      expect(backLink).toBeInTheDocument()
      expect(backLink.closest('a')).toHaveAttribute('href', '/blog')
      expect(screen.getByTestId('arrow-left-icon')).toBeInTheDocument()
    })

    it('renders the post date with calendar icon', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.getByText('January 15, 2024')).toBeInTheDocument()
      expect(screen.getByTestId('calendar-icon')).toBeInTheDocument()
    })

    it('renders tags with correct styling and icons', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      const expectedTags = ['Tools', 'Productivity', 'Developer Experience', 'CLI']
      expectedTags.forEach(tag => {
        const tagElement = screen.getByText(tag)
        expect(tagElement).toBeInTheDocument()
      })
      
      const tagIcons = screen.getAllByTestId('tag-icon')
      expect(tagIcons).toHaveLength(4)
    })

    it('does not render tags section when post has no tags', async () => {
      const postWithoutTags = { ...mockPost, tags: [] }
      ;(getBlogPost as any).mockResolvedValue(postWithoutTags)
      
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.queryByTestId('tag-icon')).not.toBeInTheDocument()
    })
  })

  describe('Content Section', () => {
    it('renders the markdown content', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.getByTestId('markdown-content')).toBeInTheDocument()
    })

    it('renders the content with proper prose styling', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      expect(screen.getByRole('article')).toBeInTheDocument()
    })

    it('renders content with correct styling structure', async () => {
      const params = Promise.resolve({ id: 'building-modern-tools' })
      render(await BlogPostPage({ params }))
      
      const contentDiv = screen.getByTestId('markdown-content').closest('div')
      expect(contentDiv).toBeInTheDocument()
    })
  })

  describe('Error Handling', () => {
    it('calls notFound when post does not exist', async () => {
      const { notFound } = await import('next/navigation')
      ;(getBlogPost as any).mockResolvedValue(null)
      
      const params = Promise.resolve({ id: 'non-existent-post' })
      
      try {
        await BlogPostPage({ params })
      } catch (error) {
        expect(error).toBeDefined()
      }
      
      expect(notFound).toHaveBeenCalled()
    })

    it('handles missing post gracefully', async () => {
      const { notFound } = await import('next/navigation')
      ;(getBlogPost as any).mockResolvedValue(null)
      
      const params = Promise.resolve({ id: 'non-existent-post' })
      
      await expect(() => BlogPostPage({ params })).rejects.toThrow()
    })
  })

  describe('Static Generation', () => {
    it('generates static params for all post IDs', async () => {
      // Import the function directly from the module
      const { generateStaticParams } = await import('./page')
      const params = await generateStaticParams()
      
      expect(getAllPostIds).toHaveBeenCalled()
      expect(params).toEqual([
        { id: 'building-modern-tools' },
        { id: 'react-framework-design' }
      ])
    })

    it('generates metadata for existing posts', async () => {
      const { generateMetadata } = await import('./page')
      const params = Promise.resolve({ id: 'building-modern-tools' })
      const metadata = await generateMetadata({ params })
      
      expect(metadata).toEqual({
        title: 'Building Modern Development Tools - James Portfolio',
        description: 'A deep dive into creating developer tools that improve productivity and developer experience.',
        keywords: ['Tools', 'Productivity', 'Developer Experience', 'CLI'],
      })
    })

    it('generates fallback metadata for non-existent posts', async () => {
      const { generateMetadata } = await import('./page')
      ;(getBlogPost as any).mockResolvedValue(null)
      const params = Promise.resolve({ id: 'non-existent-post' })
      const metadata = await generateMetadata({ params })
      
      expect(metadata).toEqual({
        title: 'Post Not Found',
      })
    })
  })
})

