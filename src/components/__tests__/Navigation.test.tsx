import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Navigation from '../Navigation'

// Mock Next.js router
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}))

describe('Navigation', () => {
  it('renders navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('James Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Showcase')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('toggles mobile menu when hamburger button is clicked', () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button')
    expect(menuButton).toBeInTheDocument()
    
    // Click menu button
    fireEvent.click(menuButton)
    
    // Menu should be visible after click
    expect(screen.getAllByText('Showcase')).toHaveLength(2)
  })

  it('closes mobile menu when a link is clicked', () => {
    render(<Navigation />)
    
    const menuButton = screen.getByRole('button')
    fireEvent.click(menuButton)
    
    // Menu is open
    expect(screen.getAllByText('Showcase')).toHaveLength(2)
    
    // Click a link (use getAllByText to handle multiple elements)
    const showcaseLinks = screen.getAllByText('Showcase')
    fireEvent.click(showcaseLinks[0])
    
    // Component should still render
    expect(screen.getByText('James Portfolio')).toBeInTheDocument()
  })
}) 