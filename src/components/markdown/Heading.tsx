import React from 'react'
import { cn } from '@/lib/utils'

interface HeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  children: React.ReactNode
  className?: string
}

const headingStyles = {
  1: 'text-4xl md:text-5xl font-bold text-red-800 mb-8 mt-12 first:mt-0',
  2: 'text-3xl md:text-4xl font-bold text-red-800 mb-6 mt-10 first:mt-0',
  3: 'text-2xl md:text-3xl font-semibold text-red-800 mb-4 mt-8 first:mt-0',
  4: 'text-xl md:text-2xl font-semibold text-red-800 mb-3 mt-6 first:mt-0',
  5: 'text-lg md:text-xl font-medium text-red-800 mb-2 mt-4 first:mt-0',
  6: 'text-base md:text-lg font-medium text-red-600 mb-2 mt-4 first:mt-0',
}

export function Heading({ level, children, className }: HeadingProps) {
  const baseStyles = headingStyles[level]
  
  switch (level) {
    case 1:
      return <h1 className={cn(baseStyles, className)}>{children}</h1>
    case 2:
      return <h2 className={cn(baseStyles, className)}>{children}</h2>
    case 3:
      return <h3 className={cn(baseStyles, className)}>{children}</h3>
    case 4:
      return <h4 className={cn(baseStyles, className)}>{children}</h4>
    case 5:
      return <h5 className={cn(baseStyles, className)}>{children}</h5>
    case 6:
      return <h6 className={cn(baseStyles, className)}>{children}</h6>
    default:
      return <h1 className={cn(baseStyles, className)}>{children}</h1>
  }
}