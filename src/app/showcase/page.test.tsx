import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ShowcasePage from './page'
import { showcaseContent } from '@/lib/content'

// Mock the ShowcaseGrid component since it has its own tests
vi.mock('@/components/ShowcaseGrid', () => ({
  default: ({ items }: any) => (
    <div data-testid="showcase-grid">
      <div data-testid="showcase-items-count">{items.length} items</div>
      {items.map((item: any) => (
        <div key={item.id} data-testid={`showcase-item-${item.id}`}>
          {item.title}
        </div>
      ))}
    </div>
  ),
}))

describe('ShowcasePage', () => {
  describe('Page Rendering', () => {
    it('renders the page title correctly', () => {
      render(<ShowcasePage />)
      
      expect(screen.getByText(showcaseContent.hero.title)).toBeInTheDocument()
    })
  })

  describe('Hero Section', () => {
    it('renders hero section with correct content', () => {
      render(<ShowcasePage />)
      expect(screen.getByText(/Explore the tools, frameworks, and projects/)).toBeInTheDocument()
    })
  })

  describe('Showcase Grid Section', () => {
    it('renders the showcase grid component', () => {
      render(<ShowcasePage />)
      
      expect(screen.getByTestId('showcase-grid')).toBeInTheDocument()
    })

    it('passes the correct number of showcase items to the grid', () => {
      render(<ShowcasePage />)
      
      expect(screen.getByText('6 items')).toBeInTheDocument()
    })

    it('renders all showcase items', () => {
      render(<ShowcasePage />)
      
      const expectedItems = [
        'React Component Library',
        'CLI Development Tool',
        'Testing Framework',
        'Build System',
        'State Management Library',
        'Development Environment'
      ]
      
      expectedItems.forEach(itemTitle => {
        expect(screen.getByText(itemTitle)).toBeInTheDocument()
      })
    })
  })
})
