import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import ShowcaseGrid from '../ShowcaseGrid'

const mockItems = [
  {
    id: 1,
    title: 'React Component Library',
    description: 'A comprehensive UI component library built with React and TypeScript.',
    category: 'framework' as const,
    tags: ['React', 'TypeScript', 'UI'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/react-components',
    featured: true,
  },
  {
    id: 2,
    title: 'CLI Development Tool',
    description: 'A command-line interface tool that automates common development tasks.',
    category: 'tool' as const,
    tags: ['Node.js', 'CLI', 'Automation'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/cli-tool',
    featured: false,
  },
]

describe('ShowcaseGrid', () => {
  it('renders all showcase items', () => {
    render(<ShowcaseGrid items={mockItems} />)
    
    expect(screen.getByText('React Component Library')).toBeInTheDocument()
    expect(screen.getByText('CLI Development Tool')).toBeInTheDocument()
  })

  it('filters items by category', () => {
    render(<ShowcaseGrid items={mockItems} />)
    
    // Click on Tools filter
    const toolsButton = screen.getByText('Tools')
    fireEvent.click(toolsButton)
    
    // Should only show CLI Development Tool
    expect(screen.queryByText('React Component Library')).not.toBeInTheDocument()
    expect(screen.getByText('CLI Development Tool')).toBeInTheDocument()
  })

  it('filters items by search term', () => {
    render(<ShowcaseGrid items={mockItems} />)
    
    const searchInput = screen.getByPlaceholderText('Search projects...')
    fireEvent.change(searchInput, { target: { value: 'React' } })
    
    // Should only show React Component Library
    expect(screen.getByText('React Component Library')).toBeInTheDocument()
    expect(screen.queryByText('CLI Development Tool')).not.toBeInTheDocument()
  })

  it('renders demo and code links', () => {
    render(<ShowcaseGrid items={mockItems} />)
    
    expect(screen.getAllByText('Demo')).toHaveLength(2)
    expect(screen.getAllByText('Code')).toHaveLength(2)
  })

  it('displays tags for each item', () => {
    render(<ShowcaseGrid items={mockItems} />)
    
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('CLI')).toBeInTheDocument()
  })
}) 