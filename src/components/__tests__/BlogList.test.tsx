import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import BlogList from '../BlogList'
import type { BlogPost } from '@/lib/blog'

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Calendar: vi.fn(() => <div data-testid="calendar-icon" />),
  Tag: vi.fn(() => <div data-testid="tag-icon" />),
  Star: vi.fn(() => <div data-testid="star-icon" />),
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}))

// Mock date-fns format
vi.mock('date-fns', () => ({
  format: vi.fn(() => 'Jan 01, 2024'),
}))

const mockPosts: BlogPost[] = [
  {
    id: 'react-framework-design',
    title: 'React Framework Design Patterns',
    date: '2024-01-01',
    excerpt: 'Exploring modern design patterns for React frameworks',
    content: 'Full content here',
    tags: ['react', 'typescript', 'design-patterns'],
    featured: true,
  },
  {
    id: 'building-modern-tools',
    title: 'Building Modern Development Tools',
    date: '2024-01-02',
    excerpt: 'A guide to creating effective development tools',
    content: 'More content here',
    tags: ['tools', 'cli', 'automation'],
    featured: false,
  },
  {
    id: 'nextjs-performance',
    title: 'Next.js Performance Optimization',
    date: '2024-01-03',
    excerpt: 'Tips and tricks for optimizing Next.js applications',
    content: 'Performance content here',
    tags: ['nextjs', 'performance', 'react'],
    featured: false,
  },
]

describe('BlogList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('renders all blog posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.getByText('Building Modern Development Tools')).toBeInTheDocument()
      expect(screen.getByText('Next.js Performance Optimization')).toBeInTheDocument()
    })

    it('renders post excerpts', () => {
      render(<BlogList posts={mockPosts} />)
      
      expect(screen.getByText(/Exploring modern design patterns/)).toBeInTheDocument()
      expect(screen.getByText(/A guide to creating effective/)).toBeInTheDocument()
    })

    it('renders post dates', () => {
      render(<BlogList posts={mockPosts} />)
      
      const dateElements = screen.getAllByText('Jan 01, 2024')
      expect(dateElements.length).toBeGreaterThan(0)
    })

    it('renders all tags for each post', () => {
      render(<BlogList posts={mockPosts} />)
      
      const tagSpans = screen.getAllByText(/react|typescript|design-patterns|tools|cli|automation/)
      expect(tagSpans.length).toBeGreaterThanOrEqual(6)
    })
  })

  describe('Featured Posts', () => {
    it('shows star icon for featured posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const starIcons = screen.getAllByTestId('star-icon')
      expect(starIcons.length).toBe(1)
    })
  })

  describe('Tag Filtering', () => {
    it('renders all tag filter buttons', () => {
      render(<BlogList posts={mockPosts} />)
      
      expect(screen.getByText('All Posts')).toBeInTheDocument()
      
      const filterButtons = screen.getAllByRole('button').filter(button => 
        button.textContent !== 'All Posts' && 
        !button.className.includes('px-2') && 
        !button.className.includes('bg-red-100')
      )
      expect(filterButtons.length).toBeGreaterThan(0)
      
      const expectedTags = ['react', 'typescript', 'tools', 'cli', 'automation', 'design-patterns', 'nextjs', 'performance']
      expectedTags.forEach(tag => {
        const button = filterButtons.find(btn => btn.textContent === tag)
        expect(button).toBeInTheDocument()
      })
    })

    it('filters posts by selected tag', () => {
      render(<BlogList posts={mockPosts} />)
      
      const reactButton = screen.getAllByRole('button').find(button => button.textContent === 'react')
      expect(reactButton).toBeInTheDocument()
      fireEvent.click(reactButton!)
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.getByText('Next.js Performance Optimization')).toBeInTheDocument()
      expect(screen.queryByText('Building Modern Development Tools')).not.toBeInTheDocument()
    })

    it('shows all posts when "All Posts" is selected', () => {
      render(<BlogList posts={mockPosts} />)
      
      // Click on a specific tag first
      const reactButton = screen.getAllByRole('button').find(button => button.textContent === 'react')
      fireEvent.click(reactButton!)
      
      // Then click on "All Posts"
      const allPostsButton = screen.getByText('All Posts')
      fireEvent.click(allPostsButton)
      
      // Should show all posts
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.getByText('Building Modern Development Tools')).toBeInTheDocument()
      expect(screen.getByText('Next.js Performance Optimization')).toBeInTheDocument()
    })
  })

  describe('Search Functionality', () => {
    it('filters posts by search term in title', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'React' } })
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.queryByText('Building Modern Development Tools')).not.toBeInTheDocument()
    })

    it('filters posts by search term in excerpt', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'design patterns' } })
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.queryByText('Building Modern Development Tools')).not.toBeInTheDocument()
    })

    it('filters posts by search term in tags', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'typescript' } })
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
      expect(screen.queryByText('Building Modern Development Tools')).not.toBeInTheDocument()
    })

    it('performs case-insensitive search', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'react' } })
      
      expect(screen.getByText('React Framework Design Patterns')).toBeInTheDocument()
    })
  })

  describe('Combined Filtering', () => {
    it('combines tag and search filters', () => {
      render(<BlogList posts={mockPosts} />)
      
      // Select react tag
      const reactButton = screen.getAllByRole('button').find(button => button.textContent === 'react')
      fireEvent.click(reactButton!)
      
      // Search for "performance"
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'performance' } })
      
      // Should only show Next.js Performance Optimization
      expect(screen.getByText('Next.js Performance Optimization')).toBeInTheDocument()
      expect(screen.queryByText('React Framework Design Patterns')).not.toBeInTheDocument()
      expect(screen.queryByText('Building Modern Development Tools')).not.toBeInTheDocument()
    })
  })

  describe('Empty State', () => {
    it('shows empty state when no posts match filters', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      fireEvent.change(searchInput, { target: { value: 'nonexistent' } })
      
      expect(screen.getByText('No articles found matching your criteria.')).toBeInTheDocument()
    })

    it('shows empty state when no posts exist', () => {
      render(<BlogList posts={[]} />)
      
      expect(screen.getByText('No articles found matching your criteria.')).toBeInTheDocument()
    })
  })

  describe('Links and Navigation', () => {
    it('renders correct links to individual blog posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const postLinks = screen.getAllByText(/Read more/)
      expect(postLinks.length).toBe(3)
      
      postLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('href')
      })
    })

    it('renders post titles as links', () => {
      render(<BlogList posts={mockPosts} />)
      
      const titleLinks = screen.getAllByText(/React Framework Design Patterns|Building Modern Development Tools|Next.js Performance Optimization/)
      titleLinks.forEach(link => {
        expect(link.closest('a')).toHaveAttribute('href')
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper input accessibility for search', () => {
      render(<BlogList posts={mockPosts} />)
      
      const searchInput = screen.getByPlaceholderText('Search articles...')
      expect(searchInput).toHaveAttribute('type', 'text')
    })

    it('has proper link accessibility', () => {
      render(<BlogList posts={mockPosts} />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })
}) 