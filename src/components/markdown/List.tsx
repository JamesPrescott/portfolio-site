import React from 'react'
import { cn } from '@/lib/utils'

interface ListProps {
  children: React.ReactNode
  className?: string
  ordered?: boolean
}

export function List({ children, className, ordered = false }: ListProps) {
  const Component = ordered ? 'ol' : 'ul'
  
  return (
    <Component className={cn(
      'mb-6 last:mb-0',
      ordered 
        ? 'list-decimal list-inside space-y-2' 
        : 'list-disc list-inside space-y-2',
      className
    )}>
      {children}
    </Component>
  )
}

export function UnorderedList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <List className={className}>{children}</List>
}

export function OrderedList({ children, className }: { children: React.ReactNode; className?: string }) {
  return <List ordered className={className}>{children}</List>
}

interface ListItemProps {
  children: React.ReactNode
  className?: string
}

export function ListItem({ children, className }: ListItemProps) {
  return (
    <li className={cn(
      'text-gray-900 leading-relaxed',
      className
    )}>
      {children}
    </li>
  )
} 