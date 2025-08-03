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
      
      // Check that tag spans exist (not filter buttons)
      const tagSpans = screen.getAllByText(/react|typescript|design-patterns|tools|cli|automation/).filter(element => 
        element.className.includes('px-2') && element.className.includes('bg-red-100')
      )

      expect(tagSpans.length).toBeGreaterThanOrEqual(6)
    })
  })

  describe('Featured Posts', () => {
    it('shows star icon for featured posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const starIcons = screen.getAllByTestId('star-icon')
      expect(starIcons.length).toBe(1)
    })

    it('applies featured styling to featured posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const featuredPost = screen.getByText('React Framework Design Patterns').closest('article')
      expect(featuredPost).toHaveClass('ring-2', 'ring-red-800')
    })

    it('does not apply featured styling posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const nonFeaturedPost = screen.getByText('Building Modern Development Tools').closest('article')
      expect(nonFeaturedPost).not.toHaveClass('ring-2', 'ring-red-800')
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

    it('applies active styling to selected tag button', () => {
      render(<BlogList posts={mockPosts} />)
      
      const reactButton = screen.getAllByRole('button').find(button => button.textContent === 'react')
      fireEvent.click(reactButton!)
      
      expect(reactButton).toHaveClass('bg-red-800', 'text-white')
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

  describe('Styling', () => {
    it('applies correct grid layout classes', () => {
      render(<BlogList posts={mockPosts} />)
      
      // Find the grid container by looking for the div with grid classes
      const gridContainer = document.querySelector('.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3')
      expect(gridContainer).toBeInTheDocument()
      expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3')
    })

    it('applies correct card styling to posts', () => {
      render(<BlogList posts={mockPosts} />)
      
      const postCards = screen.getAllByText(/React Framework Design Patterns|Building Modern Development Tools|Next.js Performance Optimization/)
      postCards.forEach(card => {
        const article = card.closest('article')
        expect(article).toHaveClass('bg-white', 'rounded-lg', 'shadow-md')
      })
    })

    it('applies correct tag styling', () => {
      render(<BlogList posts={mockPosts} />)
      
      // Find tag spans (not filter buttons) by looking for elements with tag styling
      const tagElements = screen.getAllByText(/react|typescript|tools/).filter(element => 
        element.className.includes('px-2') && element.className.includes('bg-red-100')
      )
      expect(tagElements.length).toBeGreaterThan(0)
      tagElements.forEach(tag => {
        expect(tag).toHaveClass('px-2', 'py-1', 'bg-red-100', 'text-red-700')
      })
    })
  })
}) 