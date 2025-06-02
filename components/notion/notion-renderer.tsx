'use client'

import React from 'react'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Quote, BarChart3 } from 'lucide-react'
import { CodeHighlighter } from '../code'
import { MermaidDiagram } from '../mermaid-diagram'
import { RichText } from './rich-text'
import { ParagraphBlock, HeadingBlock } from './text-blocks'
import { BulletedListItemBlock, NumberedListItemBlock, TodoBlock, ToggleBlock } from './list-blocks'
import { ImageBlock, VideoBlock, AudioBlock, FileBlock } from './media-blocks'
import { TableBlock, TableRowBlock, ColumnListBlock, ColumnBlock, TableOfContentsBlock, BreadcrumbBlock } from './layout-blocks'

type BlockWithChildren = BlockObjectResponse & { 
  children?: BlockWithChildren[] 
}

interface NotionRendererProps {
  blocks: BlockWithChildren[]
}

export function NotionRenderer({ blocks }: NotionRendererProps) {
  return (
    <div className="space-y-8">
      {blocks.map((block) => (
        <BlockRenderer key={block.id} block={block} />
      ))}
    </div>
  )
}

function BlockRenderer({ block }: { block: BlockWithChildren }) {
  const { type } = block

  switch (type) {
    case 'paragraph':
      return <ParagraphBlock block={block.paragraph} />
    
    case 'heading_1':
      return <HeadingBlock level={1} block={block.heading_1} />
    
    case 'heading_2':
      return <HeadingBlock level={2} block={block.heading_2} />
    
    case 'heading_3':
      return <HeadingBlock level={3} block={block.heading_3} />
    
    case 'bulleted_list_item':
      return <BulletedListItemBlock block={block.bulleted_list_item} children={block.children} />
    
    case 'numbered_list_item':
      return <NumberedListItemBlock block={block.numbered_list_item} children={block.children} />
    
    case 'to_do':
      return <TodoBlock block={block.to_do} children={block.children} />
    
    case 'toggle':
      return <ToggleBlock block={block.toggle} children={block.children} />
    
    case 'code':
      return <CodeBlock block={block.code} />
    
    case 'quote':
      return <QuoteBlock block={block.quote} />
    
    case 'callout':
      return <CalloutBlock block={block.callout} children={block.children} />
    
    case 'divider':
      return <Separator className="my-8" />
    
    case 'image':
      return <ImageBlock block={block.image} />
    
    case 'video':
      return <VideoBlock block={block.video} />
    
    case 'audio':
      return <AudioBlock block={block.audio} />
    
    case 'file':
      return <FileBlock block={block.file} />
    
    case 'bookmark':
      return <BookmarkBlock block={block.bookmark} />
    
    case 'link_preview':
      return <LinkPreviewBlock block={block.link_preview} />
    
    case 'embed':
      return <EmbedBlock block={block.embed} />
    
    case 'equation':
      return <EquationBlock block={block.equation} />
    
    case 'table':
      return <TableBlock block={block.table} children={block.children} />
    
    case 'table_row':
      return <TableRowBlock block={block.table_row} />
    
    case 'column_list':
      return <ColumnListBlock block={block.column_list} children={block.children} />
    
    case 'column':
      return <ColumnBlock children={block.children} />
    
    case 'table_of_contents':
      return <TableOfContentsBlock />
    
    case 'breadcrumb':
      return <BreadcrumbBlock />
    
    default:
      console.warn(`Unsupported block type: ${type}`)
      return null
  }
}

function CodeBlock({ block }: { block: any }) {
  const language = block.language || 'text'
  const code = block.rich_text?.map((text: any) => text.plain_text).join('') || ''

  const isDiagram = language === 'mermaid' || 
                   code.trim().startsWith('graph') || 
                   code.trim().startsWith('flowchart') ||
                   code.trim().startsWith('sequenceDiagram') ||
                   code.trim().startsWith('classDiagram') ||
                   code.trim().startsWith('stateDiagram') ||
                   code.trim().startsWith('pie') ||
                   code.trim().startsWith('gitgraph') ||
                   code.trim().includes('-->') ||
                   code.trim().includes('->') && code.includes(';')

  if (isDiagram) {
    return (
      <Card className="my-6">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="h-4 w-4" />
            <span className="text-base font-medium">Diagram</span>
          </div>
          <div className="bg-background border rounded-lg p-4">
            <MermaidDiagram chart={code} className="w-full" />
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="my-6">
      <CodeHighlighter
        codeString={code}
        language={language}
        className="rounded-lg border overflow-hidden"
      />
    </div>
  )
}

function QuoteBlock({ block }: { block: any }) {
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <Quote className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
          <blockquote className="text-base italic text-foreground">
            <RichText richText={block.rich_text} />
          </blockquote>
        </div>
      </CardContent>
    </Card>
  )
}

function CalloutBlock({ block, children }: { block: any; children?: BlockWithChildren[] }) {
  const icon = block.icon
  let emoji = '💡'
  
  if (icon?.type === 'emoji') {
    emoji = icon.emoji
  }
  
  return (
    <Card className="my-6 bg-muted/50">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4">
          <span className="text-2xl flex-shrink-0">{emoji}</span>
          <div className="flex-1 space-y-3">
            <div className="text-base text-foreground">
              <RichText richText={block.rich_text} />
            </div>
            {children && children.length > 0 && (
              <div>
                <NotionRenderer blocks={children} />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BookmarkBlock({ block }: { block: any }) {
  const url = block.url
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base text-foreground">Bookmark</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {url}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function LinkPreviewBlock({ block }: { block: any }) {
  const url = block.url
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base text-foreground">Link Preview</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {url}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EmbedBlock({ block }: { block: any }) {
  const url = block.url
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-base text-foreground">Embedded Content</p>
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline break-all"
            >
              {url}
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function EquationBlock({ block }: { block: any }) {
  const expression = block.expression
  
  return (
    <Card className="my-6 bg-muted">
      <CardContent className="p-6 text-center">
        <code className="text-lg font-mono text-foreground">{expression}</code>
      </CardContent>
    </Card>
  )
} 