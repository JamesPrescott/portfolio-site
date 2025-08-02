import { Metadata } from 'next'
import ShowcaseGrid from '@/components/ShowcaseGrid'
import type { ShowcaseItem } from '@/components/ShowcaseGrid'

export const metadata: Metadata = {
  title: 'Showcase - James Portfolio',
  description: 'Explore the tools, frameworks, and projects I\'ve built',
}

// Sample data - in a real app, this would come from a CMS or API
const showcaseItems: ShowcaseItem[] = [
  {
    id: 1,
    title: 'React Component Library',
    description: 'A comprehensive UI component library built with React and TypeScript, featuring accessible components and modern design patterns.',
    category: 'framework',
    tags: ['React', 'TypeScript', 'UI', 'Accessibility'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/react-components',
    featured: true,
  },
  {
    id: 2,
    title: 'CLI Development Tool',
    description: 'A command-line interface tool that automates common development tasks and improves workflow efficiency.',
    category: 'tool',
    tags: ['Node.js', 'CLI', 'Automation', 'Productivity'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/cli-tool',
    featured: true,
  },
  {
    id: 3,
    title: 'Testing Framework',
    description: 'A lightweight testing framework designed for modern JavaScript applications with zero configuration setup.',
    category: 'framework',
    tags: ['Testing', 'JavaScript', 'Zero Config', 'Modern'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/testing-framework',
    featured: false,
  },
  {
    id: 4,
    title: 'Build System',
    description: 'A fast and flexible build system that optimizes bundle sizes and improves development experience.',
    category: 'tool',
    tags: ['Build', 'Performance', 'Webpack', 'Optimization'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/build-system',
    featured: false,
  },
  {
    id: 5,
    title: 'State Management Library',
    description: 'A lightweight state management solution with TypeScript support and excellent developer experience.',
    category: 'framework',
    tags: ['State Management', 'TypeScript', 'React', 'Lightweight'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/state-library',
    featured: false,
  },
  {
    id: 6,
    title: 'Development Environment',
    description: 'A complete development environment setup with hot reloading, debugging, and testing capabilities.',
    category: 'tool',
    tags: ['Dev Environment', 'Hot Reload', 'Debugging', 'Testing'],
    image: '/api/placeholder/400/300',
    demoUrl: 'https://demo.example.com',
    githubUrl: 'https://github.com/example/dev-environment',
    featured: false,
  },
]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Showcase
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore the tools, frameworks, and projects I've built. Each project represents 
              a solution to real problems I've encountered in software development.
            </p>
          </div>
        </div>
      </section>

      {/* Showcase Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShowcaseGrid items={showcaseItems} />
        </div>
      </section>
    </div>
  )
} 