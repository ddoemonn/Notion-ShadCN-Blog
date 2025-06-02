'use client'

import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { RichText } from './rich-text'

type BlockWithChildren = BlockObjectResponse & { 
  children?: BlockWithChildren[] 
}

export function ParagraphBlock({ block }: { block: any }) {
  if (!block.rich_text || block.rich_text.length === 0) {
    return <div className="h-6" />
  }
  
  return (
    <p className="text-base leading-7 text-foreground">
      <RichText richText={block.rich_text} />
    </p>
  )
}

export function HeadingBlock({ level, block }: { level: 1 | 2 | 3; block: any }) {
  const className = {
    1: 'text-3xl md:text-4xl font-bold mt-12 mb-4 tracking-tight',
    2: 'text-2xl md:text-3xl font-bold mt-10 mb-2 tracking-tight',
    3: 'text-xl md:text-2xl font-bold mt-8 mb-1 tracking-tight'
  }[level]

  if (level === 1) {
    return (
      <h1 className={`${className} text-foreground border-b pb-2`}>
        <RichText richText={block.rich_text} />
      </h1>
    )
  }
  
  if (level === 2) {
    return (
      <h2 className={`${className} text-foreground`}>
        <RichText richText={block.rich_text} />
      </h2>
    )
  }
  
  return (
    <h3 className={`${className} text-foreground`}>
      <RichText richText={block.rich_text} />
    </h3>
  )
} 