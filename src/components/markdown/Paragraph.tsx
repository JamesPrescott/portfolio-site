import React from 'react'
import { cn } from '@/lib/utils'

interface ParagraphProps {
  children: React.ReactNode
  className?: string
}

export function Paragraph({ children, className }: ParagraphProps) {
  return (
    <p className={cn(
      'text-gray-900 leading-relaxed mb-6 last:mb-0',
      className
    )}>
      {children}
    </p>
  )
} 