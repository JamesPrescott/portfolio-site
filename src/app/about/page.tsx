import { Metadata } from 'next'
import { Mail, Github, Linkedin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About - James Portfolio',
  description: 'Learn more about James and his background in software development',
}

export default function AboutPage() {
  const skills = [
    { category: 'Languages', items: ['JavaScript', 'TypeScript', 'Python', 'Go', 'Rust'] },
    { category: 'Frontend', items: ['React', 'Next.js', 'Vue.js', 'Tailwind CSS', 'Sass'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'NestJS', 'PostgreSQL', 'MongoDB'] },
    { category: 'Tools', items: ['Git', 'Docker', 'AWS', 'Vercel', 'Figma'] },
    { category: 'Testing', items: ['Jest', 'Vitest', 'Playwright', 'Cypress', 'Testing Library'] },
  ]

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Company',
      period: '2022 - Present',
      description: 'Leading development of scalable web applications and mentoring junior developers.',
    },
    {
      title: 'Full Stack Developer',
      company: 'Startup',
      period: '2020 - 2022',
      description: 'Built and maintained multiple web applications using modern technologies.',
    },
    {
      title: 'Frontend Developer',
      company: 'Digital Agency',
      period: '2018 - 2020',
      description: 'Created responsive and accessible user interfaces for various clients.',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About Me
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              I'm a passionate software developer who loves building tools, frameworks, and sharing knowledge 
              with the community. Here's a bit more about my journey and what drives me.
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-6">
                I've been passionate about software development for over 8 years, starting with simple 
                HTML and CSS websites and evolving into building complex applications and developer tools. 
                My journey has taught me the importance of clean code, user experience, and continuous learning.
              </p>
              <p className="text-gray-700 mb-6">
                I believe in the power of open source and community-driven development. Most of my projects 
                are available on GitHub, and I actively contribute to various open source projects. When I'm 
                not coding, you'll find me writing technical articles, speaking at conferences, or mentoring 
                other developers.
              </p>
              <p className="text-gray-700">
                My approach to development focuses on creating solutions that are not only functional but also 
                maintainable, scalable, and user-friendly. I'm always exploring new technologies and methodologies 
                to stay current with industry best practices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
            <p className="text-xl text-gray-600">
              Here are the technologies and tools I work with regularly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skills.map((skillGroup) => (
              <div key={skillGroup.category} className="bg-white rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Experience</h2>
            <p className="text-xl text-gray-600">
              My professional journey in software development.
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((experience, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-gray-900">{experience.title}</h3>
                <p className="text-blue-600 font-medium">{experience.company}</p>
                <p className="text-gray-500 text-sm mb-2">{experience.period}</p>
                <p className="text-gray-700">{experience.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <p className="text-xl text-gray-600 mb-8">
            I'm always interested in new opportunities, collaborations, or just a good conversation about tech.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:james@example.com"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Mail size={20} className="mr-2" />
              Send Email
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Github size={20} className="mr-2" />
              GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Linkedin size={20} className="mr-2" />
              LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  )
} 