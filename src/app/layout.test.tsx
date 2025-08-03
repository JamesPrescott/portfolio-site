import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import RootLayout from './layout'

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Menu: vi.fn(() => <div data-testid="menu-icon" />),
  X: vi.fn(() => <div data-testid="x-icon" />),
  Github: vi.fn(() => <div data-testid="github-icon" />),
  Linkedin: vi.fn(() => <div data-testid="linkedin-icon" />),
  Twitter: vi.fn(() => <div data-testid="twitter-icon" />),
}))

// Mock Next.js Link
vi.mock('next/link', () => ({
  default: vi.fn(({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  )),
}))

// Mock Next.js navigation
vi.mock('next/navigation', () => ({
  usePathname() {
    return '/'
  },
}))

// Mock Next.js font
vi.mock('next/font/google', () => ({
  Inter: vi.fn(() => ({
    className: 'inter-font-class',
  })),
}))

// Mock the Navigation component
vi.mock('@/components/Navigation', () => ({
  default: vi.fn(() => (
    <nav data-testid="navigation">
      <div data-testid="nav-brand">James Portfolio</div>
      <div data-testid="nav-links">
        <a href="/" data-testid="nav-home">Home</a>
        <a href="/showcase" data-testid="nav-showcase">Showcase</a>
        <a href="/blog" data-testid="nav-blog">Blog</a>
        <a href="/about" data-testid="nav-about">About</a>
      </div>
    </nav>
  )),
}))

// Mock the Footer component
vi.mock('@/components/Footer', () => ({
  default: vi.fn(() => (
    <footer data-testid="footer">
      <div data-testid="footer-content">
        <div data-testid="footer-brand">James Portfolio</div>
        <div data-testid="footer-links">
          <a href="/showcase" data-testid="footer-showcase">Showcase</a>
          <a href="/blog" data-testid="footer-blog">Blog</a>
          <a href="/about" data-testid="footer-about">About</a>
        </div>
        <div data-testid="footer-social">
          <a href="https://github.com" data-testid="footer-github">GitHub</a>
          <a href="https://linkedin.com" data-testid="footer-linkedin">LinkedIn</a>
          <a href="https://twitter.com" data-testid="footer-twitter">Twitter</a>
        </div>
      </div>
    </footer>
  )),
}))

describe('RootLayout', () => {
  describe('Page Structure', () => {
    it('renders the layout with correct HTML structure', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      // Check for html and body elements
      const html = document.querySelector('html')
      expect(html).toBeInTheDocument()
      expect(html).toHaveAttribute('lang', 'en')
      
      const body = document.querySelector('body')
      expect(body).toBeInTheDocument()
      expect(body).toHaveClass('inter-font-class')
    })

    it('renders the main container with correct layout classes', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      const mainContainer = document.querySelector('.min-h-screen.flex.flex-col')
      expect(mainContainer).toBeInTheDocument()
    })
  })

  describe('Component Integration', () => {
    it('renders Navigation component', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      expect(screen.getByTestId('navigation')).toBeInTheDocument()
    })

    it('renders Footer component', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      expect(screen.getByTestId('footer')).toBeInTheDocument()
    })

    it('renders children content in main element', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      expect(screen.getByTestId('page-content')).toBeInTheDocument()
      expect(screen.getByText('Test Content')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper HTML lang attribute', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      const html = document.querySelector('html')
      expect(html).toHaveAttribute('lang', 'en')
    })

    it('has proper semantic structure', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      // Check for semantic elements
      expect(document.querySelector('nav')).toBeInTheDocument()
      expect(document.querySelector('main')).toBeInTheDocument()
      expect(document.querySelector('footer')).toBeInTheDocument()
    })

    it('has proper link accessibility', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })
  })

  describe('Styling', () => {
    it('applies Inter font class to body', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      const body = document.querySelector('body')
      expect(body).toHaveClass('inter-font-class')
    })

    it('applies correct layout classes to main container', () => {
      render(
        <RootLayout>
          <div data-testid="page-content">Test Content</div>
        </RootLayout>
      )
      
      const mainContainer = document.querySelector('.min-h-screen.flex.flex-col')
      expect(mainContainer).toHaveClass('min-h-screen', 'flex', 'flex-col')
    })
  })
})
