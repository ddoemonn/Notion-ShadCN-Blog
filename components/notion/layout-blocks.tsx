'use client'

import React from 'react'
import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { TableIcon } from 'lucide-react'
import { RichText } from './rich-text'
import { BlockWithChildren } from './types'

export function TableBlock({ block, children }: { block: any; children?: BlockWithChildren[] }) {
  if (!children || children.length === 0) {
    return (
      <Card className="my-6">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <TableIcon className="h-6 w-6 text-primary" />
            <p className="font-semibold text-base text-foreground">Empty Table</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  const hasColumnHeader = block.has_column_header
  const hasRowHeader = block.has_row_header
  const tableRows = children.filter(child => child.type === 'table_row')

  return (
    <Card className="my-6 overflow-hidden">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            {hasColumnHeader && tableRows.length > 0 && (
              <TableHeader>
                <TableRow className="bg-muted">
                  {tableRows[0].table_row?.cells?.map((cell: any[], cellIndex: number) => (
                    <TableHead key={cellIndex} className="font-semibold">
                      <RichText richText={cell} />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
            )}
            <TableBody>
              {tableRows.slice(hasColumnHeader ? 1 : 0).map((row, index) => (
                <TableRow key={row.id}>
                  {row.table_row?.cells?.map((cell: any[], cellIndex: number) => (
                    <TableCell 
                      key={cellIndex} 
                      className={hasRowHeader && cellIndex === 0 ? "font-medium bg-muted/50" : ""}
                    >
                      <RichText richText={cell} />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export function TableRowBlock({ block }: { block: any }) {
  return null
}

export function ColumnListBlock({ 
  block, 
  children, 
  renderChildren 
}: { 
  block: any; 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  if (!children || children.length === 0) {
    return (
      <Card className="my-6">
        <CardContent className="p-6">
          <p className="text-center text-muted-foreground font-medium">Empty Column Layout</p>
        </CardContent>
      </Card>
    )
  }

  const columns = children.filter(child => child.type === 'column')
  const gridCols = columns.length <= 2 ? 'grid-cols-1 md:grid-cols-2' : 
                   columns.length <= 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
                   'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'

  return (
    <div className={`my-6 grid ${gridCols} gap-6`}>
      {columns.map((column, index) => (
        <ColumnBlock 
          key={column.id} 
          children={column.children} 
          renderChildren={renderChildren}
        />
      ))}
    </div>
  )
}

export function ColumnBlock({ 
  children, 
  renderChildren 
}: { 
  children?: BlockWithChildren[];
  renderChildren?: (blocks: BlockWithChildren[]) => React.ReactNode;
}) {
  return (
    <Card className="h-fit">
      <CardContent className="p-4">
        {children && children.length > 0 && renderChildren ? (
          <div className="space-y-4">
            {renderChildren(children)}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">Empty column</p>
        )}
      </CardContent>
    </Card>
  )
}

export function TableOfContentsBlock() {
  return (
    <Card className="my-6">
      <CardHeader>
        <CardTitle className="text-base">Table of Contents</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          Table of contents would be generated from headings in the page.
        </p>
      </CardContent>
    </Card>
  )
}

export function BreadcrumbBlock() {
  return (
    <nav className="my-6 text-sm text-muted-foreground">
      <span>Home</span> → <span>Blog</span>
    </nav>
  )
} 