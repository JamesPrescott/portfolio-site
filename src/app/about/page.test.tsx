import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import AboutPage from './page'
import { aboutContent } from '@/lib/content'

// Mock the lucide-react icons
vi.mock('lucide-react', () => ({
  Mail: vi.fn(() => <div data-testid="mail-icon" />),
  Github: vi.fn(() => <div data-testid="github-icon" />),
  Linkedin: vi.fn(() => <div data-testid="linkedin-icon" />),
}))

describe('AboutPage', () => {
  describe('Hero Section', () => {
    it('renders hero section with correct content', () => {
      render(<AboutPage />)
      
      expect(screen.getByText(aboutContent.hero.title)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.hero.description)).toBeInTheDocument()
    })
  })

  describe('Bio Section', () => {
    it('renders bio section with correct title', () => {
      render(<AboutPage />)
      
      expect(screen.getByText(aboutContent.bio.title)).toBeInTheDocument()
    })

    it('renders all bio paragraphs', () => {
      render(<AboutPage />)
      
      aboutContent.bio.paragraphs.forEach(paragraph => {
        expect(screen.getByText(paragraph)).toBeInTheDocument()
      })
    })
  })

  describe('Skills Section', () => {
    it('renders skills section title', () => {
      render(<AboutPage />)
      
      expect(screen.getByText('Skills & Technologies')).toBeInTheDocument()
      expect(screen.getByText('Here are the technologies and tools I work with regularly.')).toBeInTheDocument()
    })

    it('renders all skill categories', () => {
      render(<AboutPage />)
      
      const expectedCategories = ['Languages', 'Frontend', 'Backend', 'Tools', 'Testing']
      expectedCategories.forEach(category => {
        expect(screen.getByText(category)).toBeInTheDocument()
      })
    })

    it('renders all skills in each category', () => {
      render(<AboutPage />)
      
      const expectedSkills = [
        'JavaScript', 'TypeScript', 'Python', 'Go', 'Rust',
        'React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Sass',
        'Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB',
        'Git', 'Docker', 'AWS', 'Vercel', 'Figma',
        'Jest', 'Vitest', 'Playwright', 'Cypress', 'Testing Library'
      ]
      
      expectedSkills.forEach(skill => {
        expect(screen.getByText(skill)).toBeInTheDocument()
      })
    })
  })

  describe('Experience Section', () => {
    it('renders experience section title', () => {
      render(<AboutPage />)
      
      expect(screen.getByText('Experience')).toBeInTheDocument()
      expect(screen.getByText('My professional journey in software development.')).toBeInTheDocument()
    })

    it('renders all experience entries', () => {
      render(<AboutPage />)
      
      const expectedExperiences = [
        {
          title: 'Senior Software Engineer',
          company: 'Tech Company',
          period: '2022 - Present',
          description: 'Leading development of scalable web applications and mentoring junior developers.'
        },
        {
          title: 'Full Stack Developer',
          company: 'Startup',
          period: '2020 - 2022',
          description: 'Built and maintained multiple web applications using modern technologies.'
        },
        {
          title: 'Frontend Developer',
          company: 'Digital Agency',
          period: '2018 - 2020',
          description: 'Created responsive and accessible user interfaces for various clients.'
        }
      ]
      
      expectedExperiences.forEach(experience => {
        expect(screen.getByText(experience.title)).toBeInTheDocument()
        expect(screen.getByText(experience.company)).toBeInTheDocument()
        expect(screen.getByText(experience.period)).toBeInTheDocument()
        expect(screen.getByText(experience.description)).toBeInTheDocument()
      })
    })
  })

  describe('Contact Section', () => {
    it('renders contact section with correct content', () => {
      render(<AboutPage />)
      
      expect(screen.getByText(aboutContent.contact.title)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.contact.description)).toBeInTheDocument()
    })

    it('renders contact buttons with correct text and icons', () => {
      render(<AboutPage />)
      
      // Check email button
      const emailButton = screen.getByText('Send Email')
      expect(emailButton).toBeInTheDocument()
      expect(emailButton.closest('a')).toHaveAttribute('href', 'mailto:james@example.com')
      expect(screen.getByTestId('mail-icon')).toBeInTheDocument()
      
      // Check GitHub button
      const githubButton = screen.getByText('GitHub')
      expect(githubButton).toBeInTheDocument()
      expect(githubButton.closest('a')).toHaveAttribute('href', 'https://github.com')
      expect(githubButton.closest('a')).toHaveAttribute('target', '_blank')
      expect(githubButton.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
      expect(screen.getByTestId('github-icon')).toBeInTheDocument()
      
      // Check LinkedIn button
      const linkedinButton = screen.getByText('LinkedIn')
      expect(linkedinButton).toBeInTheDocument()
      expect(linkedinButton.closest('a')).toHaveAttribute('href', 'https://linkedin.com')
      expect(linkedinButton.closest('a')).toHaveAttribute('target', '_blank')
      expect(linkedinButton.closest('a')).toHaveAttribute('rel', 'noopener noreferrer')
      expect(screen.getByTestId('linkedin-icon')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('has proper heading structure', () => {
      render(<AboutPage />)
      
      const h1 = screen.getByRole('heading', { level: 1 })
      expect(h1).toBeInTheDocument()
      expect(h1).toHaveTextContent(aboutContent.hero.title)
      
      const h2Elements = screen.getAllByRole('heading', { level: 2 })
      expect(h2Elements).toHaveLength(4) // bio, skills, experience, contact
    })

    it('has proper link accessibility', () => {
      render(<AboutPage />)
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveAttribute('href')
      })
    })

    it('has proper button accessibility for contact buttons', () => {
      render(<AboutPage />)
      
      const contactButtons = screen.getAllByRole('link')
      contactButtons.forEach(button => {
        expect(button.textContent?.trim()).toBeTruthy()
      })
    })
  })

  describe('Content Integration', () => {
    it('uses content from the content library', () => {
      render(<AboutPage />)
      
      // Verify that content from the library is being used
      expect(screen.getByText(aboutContent.hero.title)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.hero.description)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.bio.title)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.contact.title)).toBeInTheDocument()
      expect(screen.getByText(aboutContent.contact.description)).toBeInTheDocument()
    })

    it('renders all bio paragraphs from content library', () => {
      render(<AboutPage />)
      
      aboutContent.bio.paragraphs.forEach(paragraph => {
        expect(screen.getByText(paragraph)).toBeInTheDocument()
      })
    })
  })
})
