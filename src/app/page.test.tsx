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
    it('renders hero section with correct styling', () => {
      render(<Home />)
      
      const heroSection = screen.getByText(homeContent.hero.title).closest('section')
      expect(heroSection).toBeInTheDocument()
      expect(heroSection).toHaveClass('bg-gradient-to-br', 'from-red-800', 'to-red-900')
    })

    it('renders hero title with correct content and styling', () => {
      render(<Home />)
      
      const title = screen.getByRole('heading', { level: 1 })
      expect(title).toBeInTheDocument()
      expect(title).toHaveTextContent(homeContent.hero.title)
      expect(title).toHaveClass('text-4xl', 'md:text-6xl', 'font-bold', 'text-white')
    })

    it('renders hero description with correct content and styling', () => {
      render(<Home />)
      
      const description = screen.getByText(homeContent.hero.description)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-xl', 'md:text-2xl', 'text-gray-300')
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

    it('has responsive container classes', () => {
      render(<Home />)
      
      const heroContainer = screen.getByText(homeContent.hero.title).closest('section')?.querySelector('div')
      expect(heroContainer).toHaveClass('max-w-7xl', 'mx-auto', 'px-4', 'sm:px-6', 'lg:px-8')
    })
  })

  describe('Features Section', () => {
    it('renders features section with correct styling', () => {
      render(<Home />)
      
      const featuresSection = screen.getByText(homeContent.features.title).closest('section')
      expect(featuresSection).toBeInTheDocument()
      expect(featuresSection).toHaveClass('py-20', 'bg-gray-50')
    })

    it('renders features section title and description', () => {
      render(<Home />)
      
      const title = screen.getByText(homeContent.features.title)
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold', 'text-gray-900')
      
      // Find the description within the features section specifically
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

    it('has responsive grid layout for features', () => {
      render(<Home />)
      
      const featuresGrid = screen.getByText('Build Tools').closest('div')?.parentElement
      expect(featuresGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3')
    })
  })

  describe('CTA Section', () => {
    it('renders CTA section with correct styling', () => {
      render(<Home />)
      
      const ctaSection = screen.getByText(homeContent.cta.title).closest('section')
      expect(ctaSection).toBeInTheDocument()
      expect(ctaSection).toHaveClass('bg-red-800', 'text-white')
    })

    it('renders CTA title and description', () => {
      render(<Home />)
      
      const title = screen.getByText(homeContent.cta.title)
      expect(title).toBeInTheDocument()
      expect(title).toHaveClass('text-3xl', 'md:text-4xl', 'font-bold')
      
      const description = screen.getByText(homeContent.cta.description)
      expect(description).toBeInTheDocument()
      expect(description).toHaveClass('text-xl', 'text-gray-300')
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

  describe('Responsive Design', () => {
    it('has responsive text classes for hero title', () => {
      render(<Home />)
      
      const heroTitle = screen.getByText(homeContent.hero.title)
      expect(heroTitle).toHaveClass('text-4xl', 'md:text-6xl')
    })

    it('has responsive text classes for hero description', () => {
      render(<Home />)
      
      const heroDescription = screen.getByText(homeContent.hero.description)
      expect(heroDescription).toHaveClass('text-xl', 'md:text-2xl')
    })

    it('has responsive flex classes for hero buttons', () => {
      render(<Home />)
      
      const heroButtonsContainer = screen.getByText('View My Work').closest('div')
      expect(heroButtonsContainer).toHaveClass('flex', 'flex-col', 'sm:flex-row')
    })

    it('has responsive grid classes for features', () => {
      render(<Home />)
      
      const featuresGrid = screen.getByText('Build Tools').closest('div')?.parentElement
      expect(featuresGrid).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-3')
    })
  })

  describe('Styling', () => {
    it('applies correct gradient background to hero section', () => {
      render(<Home />)
      
      const heroSection = screen.getByText(homeContent.hero.title).closest('section')
      expect(heroSection).toHaveClass('bg-gradient-to-br', 'from-red-800', 'to-red-900')
    })

    it('applies correct background to features section', () => {
      render(<Home />)
      
      const featuresSection = screen.getByText(homeContent.features.title).closest('section')
      expect(featuresSection).toHaveClass('bg-gray-50')
    })

    it('applies correct background to CTA section', () => {
      render(<Home />)
      
      const ctaSection = screen.getByText(homeContent.cta.title).closest('section')
      expect(ctaSection).toHaveClass('bg-red-800', 'text-white')
    })

    it('applies correct styling to feature icons', () => {
      render(<Home />)
      
      const iconContainers = document.querySelectorAll('.bg-red-100.w-16.h-16.rounded-full')
      expect(iconContainers.length).toBe(3)
    })
  })
})
