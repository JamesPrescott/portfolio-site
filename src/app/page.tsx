import Link from 'next/link'
import { ArrowRight, Code, BookOpen, ToolCase } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-red-800 to-red-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Hi, I'm James
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              I build tools, frameworks, and write about software development. 
              Welcome to my portfolio where I showcase my work and share insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/showcase"
                className="inline-flex items-center px-6 py-3 bg-white text-red-800 font-semibold rounded-lg hover:bg-red-100 transition-colors"
              >
                View My Work
                <ArrowRight className="ml-2" size={20} />
              </Link>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-white font-semibold rounded-lg hover:bg-gray-50 hover:text-red-800 transition-colors"
              >
                Read My Blog
                <BookOpen className="ml-2" size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What I Do
            </h2>
            <p className="text-xl text-gray-900 max-w-2xl mx-auto">
              I focus on creating practical tools and frameworks that solve real problems, 
              and share my knowledge through writing and open source contributions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ToolCase className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Build Tools</h3>
              <p className="text-gray-900">
                Creating developer tools and utilities that improve productivity and developer experience.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Frameworks</h3>
              <p className="text-gray-900">
                Developing frameworks and libraries that simplify complex tasks and accelerate development.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-red-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Knowledge</h3>
              <p className="text-gray-900">
                Writing articles and tutorials to help others learn and grow in their development journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to explore?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Check out my latest projects and articles, or get in touch to discuss collaboration opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/showcase"
              className="inline-flex items-center px-6 py-3 bg-white text-red-800 font-semibold rounded-lg hover:bg-red-100 transition-colors"
            >
              Explore Showcase
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center px-6 py-3 border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-red-800 transition-colors"
            >
              Learn More About Me
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
