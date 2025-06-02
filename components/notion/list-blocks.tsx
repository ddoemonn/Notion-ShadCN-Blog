'use client'

import React from 'react'
import { CheckSquare, Square, ChevronRight } from 'lucide-react'
import { RichText } from './rich-text'
import { BlockWithChildren } from './types'

export function BulletedListItemBlock({ 
  block, 
  children, 
  renderChildren 
}: { 
  block: any; 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3 ml-4">
        <span className="mt-2 h-1.5 w-1.5 bg-foreground rounded-full flex-shrink-0" />
        <div className="flex-1 text-base text-foreground">
          <RichText richText={block.rich_text} />
        </div>
      </div>
      {children && children.length > 0 && renderChildren && (
        <div className="ml-6">
          {renderChildren(children)}
        </div>
      )}
    </div>
  )
}

export function NumberedListItemBlock({ 
  block, 
  children, 
  renderChildren 
}: { 
  block: any; 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3 ml-4">
        <span className="mt-0.5 text-base text-foreground font-medium min-w-[1.5rem]">1.</span>
        <div className="flex-1 text-base text-foreground">
          <RichText richText={block.rich_text} />
        </div>
      </div>
      {children && children.length > 0 && renderChildren && (
        <div className="ml-6">
          {renderChildren(children)}
        </div>
      )}
    </div>
  )
}

export function TodoBlock({ 
  block, 
  children, 
  renderChildren 
}: { 
  block: any; 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  const isChecked = block.checked
  
  return (
    <div className="space-y-2">
      <div className="flex items-start space-x-3">
        {isChecked ? (
          <CheckSquare className="h-5 w-5 mt-0.5 text-primary" />
        ) : (
          <Square className="h-5 w-5 mt-0.5 text-muted-foreground" />
        )}
        <div className={`flex-1 text-base ${isChecked ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
          <RichText richText={block.rich_text} />
        </div>
      </div>
      {children && children.length > 0 && renderChildren && (
        <div className="ml-8">
          {renderChildren(children)}
        </div>
      )}
    </div>
  )
}

export function ToggleBlock({ 
  block, 
  children, 
  renderChildren 
}: { 
  block: any; 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  return (
    <details className="group my-4">
      <summary className="cursor-pointer list-none">
        <div className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-muted transition-colors">
          <ChevronRight className="h-4 w-4 group-open:rotate-90 transition-transform text-muted-foreground" />
          <span className="text-base font-medium text-foreground">
            <RichText richText={block.rich_text} />
          </span>
        </div>
      </summary>
      {children && children.length > 0 && renderChildren && (
        <div className="ml-6 mt-3 p-4 border-l-2 border-muted">
          {renderChildren(children)}
        </div>
      )}
    </details>
  )
} 