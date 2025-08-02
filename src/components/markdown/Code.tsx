import React from 'react'
import { cn } from '@/lib/utils'

interface InlineCodeProps {
  children: React.ReactNode
  className?: string
}

export function InlineCode({ children, className }: InlineCodeProps) {
  return (
    <code className={cn(
      'px-2 py-1 bg-gray-100 text-gray-900 rounded text-sm font-mono',
      className
    )}>
      {children}
    </code>
  )
}

interface CodeBlockProps {
  children: React.ReactNode
  className?: string
  language?: string
}

export function CodeBlock({ children, className, language }: CodeBlockProps) {
  return (
    <div className={cn(
      'bg-gray-900 text-gray-100 rounded-lg p-6 mb-6 last:mb-0 overflow-x-auto',
      className
    )}>
      {language && (
        <div className="text-xs text-gray-400 mb-2 font-mono">
          {language}
        </div>
      )}
      <pre className="text-sm leading-relaxed">
        <code className="font-mono">
          {children}
        </code>
      </pre>
    </div>
  )
} 