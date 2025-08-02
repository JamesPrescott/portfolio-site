import React from 'react'
import { cn } from '@/lib/utils'

interface BlockquoteProps {
  children: React.ReactNode
  className?: string
}

export function Blockquote({ children, className }: BlockquoteProps) {
  return (
    <blockquote className={cn(
      'border-l-4 border-blue-500 pl-6 py-4 mb-6 last:mb-0 bg-blue-50 rounded-r-lg',
      className
    )}>
      <div className="text-gray-900 italic leading-relaxed">
        {children}
      </div>
    </blockquote>
  )
} 