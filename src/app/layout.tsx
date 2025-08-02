import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'James Portfolio',
  description: 'Portfolio showcasing tools, frameworks, and blog articles',
  keywords: ['portfolio', 'developer', 'tools', 'frameworks', 'blog'],
  authors: [{ name: 'James' }],
  openGraph: {
    title: 'James Portfolio',
    description: 'Portfolio showcasing tools, frameworks, and blog articles',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
