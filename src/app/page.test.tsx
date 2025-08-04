import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Home from './page'
import { homeContent } from '@/lib/content'

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowRight: vi.fn(() => <div data-testid="arrow-right-icon" />),
  Code: vi.fn(() => <div data-testid="code-icon" />),
  BookOpen: vi.fn(() => <div data-testid="book-open-icon" />),
  ToolCase: vi.fn(() => <div data-testid="tool-case-icon" />),
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}))

describe('Home', () => {
  describe('Page Structure', () => {
    it('renders the page with correct layout structure', () => {
      render(<Home />)
      
      const mainContainer = document.querySelector('.min-h-screen')
      expect(mainContainer).toBeInTheDocument()
    })

    it('renders all three main sections', () => {
      render(<Home />)
      
      const sections = document.querySelectorAll('section')
      expect(sections).toHaveLength(3)
    })
  })

  describe('Hero Section', () => {
    it('renders hero title with correct content', () => {
      render(<Home />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(homeContent.hero.title)
    })

    it('renders hero description with correct content', () => {
      render(<Home />)
      
      const description = screen.getByText(homeContent.hero.description)
      expect(description).toBeInTheDocument()
    })

    it('renders hero call-to-action buttons', () => {
      render(<Home />)
      
      const viewWorkButton = screen.getByText('View My Work')
      const readBlogButton = screen.getByText('Read My Blog')
      
      expect(viewWorkButton).toBeInTheDocument()
      expect(readBlogButton).toBeInTheDocument()
      
      expect(viewWorkButton.closest('a')).toHaveAttribute('href', '/showcase')
      expect(readBlogButton.closest('a')).toHaveAttribute('href', '/blog')
    })
  })

  describe('Features Section', () => {
    it('renders features section', () => {
      render(<Home />)
      
      const featuresSection = screen.getByText(homeContent.features.title).closest('section')
      expect(featuresSection).toBeInTheDocument()
    })

    it('renders features section title and description', () => {
      render(<Home />)
      
      const title = screen.getByText(homeContent.features.title)
      expect(title).toBeInTheDocument()
      
      const featuresSection = screen.getByText(homeContent.features.title).closest('section')
      const description = featuresSection?.querySelector('p')
      expect(description).toBeInTheDocument()
      expect(description?.textContent).toContain('I focus on creating practical tools')
    })

    it('renders all three feature cards', () => {
      render(<Home />)
      
      const expectedFeatures = [
        'Build Tools',
        'Write About Software Development',
        'Open Source Contributions'
      ]
      
      expectedFeatures.forEach(feature => {
        expect(screen.getByText(feature)).toBeInTheDocument()
      })
    })

    it('renders feature descriptions', () => {
      render(<Home />)
      
      const expectedDescriptions = [
        'Creating developer tools and utilities that improve productivity and developer experience.',
        'Sharing my knowledge through writing and open source contributions.',
        'Contributing to open source projects to help the community.'
      ]
      
      expectedDescriptions.forEach(description => {
        expect(screen.getByText(description)).toBeInTheDocument()
      })
    })

    it('renders feature icons', () => {
      render(<Home />)
      
      expect(screen.getByTestId('tool-case-icon')).toBeInTheDocument()
      expect(screen.getByTestId('code-icon')).toBeInTheDocument()
      
      // Check that we have book-open icons (both in hero button and feature card)
      const bookOpenIcons = screen.getAllByTestId('book-open-icon')
      expect(bookOpenIcons.length).toBe(2)
    })
  })

  describe('CTA Section', () => {
    it('renders CTA section with correct styling', () => {
      render(<Home />)
      
      const ctaSection = screen.getByText(homeContent.cta.title).closest('section')
      expect(ctaSection).toBeInTheDocument()
    })

    it('renders CTA title and description', () => {
      render(<Home />)
      
      const title = screen.getByText(homeContent.cta.title)
      expect(title).toBeInTheDocument()
      
      const description = screen.getByText(homeContent.cta.description)
      expect(description).toBeInTheDocument()
    })

    it('renders CTA buttons', () => {
      render(<Home />)
      
      const exploreButton = screen.getByText('Explore Showcase')
      const learnMoreButton = screen.getByText('Learn More About Me')
      
      expect(exploreButton).toBeInTheDocument()
      expect(learnMoreButton).toBeInTheDocument()
      
      expect(exploreButton.closest('a')).toHaveAttribute('href', '/showcase')
      expect(learnMoreButton.closest('a')).toHaveAttribute('href', '/about')
    })
  })

  describe('Content Integration', () => {
    it('renders all feature content from library', () => {
      render(<Home />)
      
      homeContent.features.features.forEach(feature => {
        expect(screen.getByText(feature.title)).toBeInTheDocument()
        expect(screen.getByText(feature.description)).toBeInTheDocument()
      })
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<Home />)
      
      // Check for h1 (hero title)
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent(homeContent.hero.title)
      
      // Check for h2 elements (features and CTA titles)
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements.length).toBe(2) // features title and CTA title
    })

    it('has proper link accessibility', () => {
      render(<Home />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('has proper button accessibility for CTA buttons', () => {
      render(<Home />)
      
      const ctaButtons = screen.getAllByRole('link')
      ctaButtons.forEach(button => {
        expect(button.textContent?.trim()).toBeTruthy()
      })
    })
  })
})
