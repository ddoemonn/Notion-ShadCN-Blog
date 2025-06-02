'use client'

import Link from 'next/link'

export function RichText({ richText }: { richText: any[] }) {
  if (!richText || richText.length === 0) return null

  return (
    <>
      {richText.map((text, index) => {
        let content = text.plain_text
        let className = ''

        if (text.annotations.bold) {
          className += 'font-bold '
        }
        if (text.annotations.italic) {
          className += 'italic '
        }
        if (text.annotations.strikethrough) {
          className += 'line-through '
        }
        if (text.annotations.underline) {
          className += 'underline '
        }
        if (text.annotations.code) {
          return (
            <code key={index} className="bg-muted text-muted-foreground px-2 py-1 rounded text-sm font-mono border">
              {content}
            </code>
          )
        }

        if (text.annotations.color && text.annotations.color !== 'default') {
          const colorMap: Record<string, string> = {
            gray: 'text-muted-foreground',
            brown: 'text-amber-700 dark:text-amber-300',
            orange: 'text-orange-700 dark:text-orange-300',
            yellow: 'text-yellow-700 dark:text-yellow-300',
            green: 'text-green-700 dark:text-green-300',
            blue: 'text-blue-700 dark:text-blue-300',
            purple: 'text-purple-700 dark:text-purple-300',
            pink: 'text-pink-700 dark:text-pink-300',
            red: 'text-red-700 dark:text-red-300',
            gray_background: 'bg-muted text-muted-foreground px-2 py-1 rounded',
            brown_background: 'bg-amber-100 dark:bg-amber-900 text-amber-900 dark:text-amber-100 px-2 py-1 rounded',
            orange_background: 'bg-orange-100 dark:bg-orange-900 text-orange-900 dark:text-orange-100 px-2 py-1 rounded',
            yellow_background: 'bg-yellow-100 dark:bg-yellow-900 text-yellow-900 dark:text-yellow-100 px-2 py-1 rounded',
            green_background: 'bg-green-100 dark:bg-green-900 text-green-900 dark:text-green-100 px-2 py-1 rounded',
            blue_background: 'bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100 px-2 py-1 rounded',
            purple_background: 'bg-purple-100 dark:bg-purple-900 text-purple-900 dark:text-purple-100 px-2 py-1 rounded',
            pink_background: 'bg-pink-100 dark:bg-pink-900 text-pink-900 dark:text-pink-100 px-2 py-1 rounded',
            red_background: 'bg-red-100 dark:bg-red-900 text-red-900 dark:text-red-100 px-2 py-1 rounded',
          }
          className += colorMap[text.annotations.color] || ''
        }

        if (text.href) {
          return (
            <Link 
              key={index} 
              href={text.href}
              className={`${className} text-primary underline underline-offset-4 hover:underline-offset-2 transition-all duration-200`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content}
            </Link>
          )
        }

        return (
          <span key={index} className={className}>
            {content}
          </span>
        )
      })}
    </>
  )
} 