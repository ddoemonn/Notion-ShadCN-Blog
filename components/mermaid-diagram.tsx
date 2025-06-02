"use client"

import { useEffect, useRef, useState } from 'react'
import { useTheme } from 'next-themes'
import mermaid from 'mermaid'

interface MermaidDiagramProps {
  chart: string
  className?: string
}

export function MermaidDiagram({ chart, className = "" }: MermaidDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (!isInitialized) {
      const isDark = resolvedTheme === 'dark' || 
                     (resolvedTheme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

      mermaid.initialize({
        startOnLoad: false,
        theme: isDark ? 'dark' : 'default',
        securityLevel: 'loose',
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontSize: 14,
        flowchart: {
          useMaxWidth: true,
          htmlLabels: true,
          curve: 'basis'
        },
      })
      setIsInitialized(true)
    }
  }, [isInitialized, resolvedTheme])

  useEffect(() => {
    if (!containerRef.current || !isInitialized) return

    const renderDiagram = async () => {
      if (!containerRef.current) return
      
      try {
        containerRef.current.innerHTML = ''
        
        const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`
        
        const { svg } = await mermaid.render(id, chart)
        
        if (containerRef.current) {
          containerRef.current.innerHTML = svg
        }
      } catch (error) {
        console.error('Mermaid rendering error:', error)
        if (containerRef.current) {
          containerRef.current.innerHTML = `
            <div class="p-6 text-center border border-dashed border-muted-foreground/50 rounded-lg bg-muted/50">
              <div class="text-muted-foreground mb-2">
                <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
                <p class="font-medium">Error rendering diagram</p>
                <p class="text-sm mt-1">Please check the diagram syntax</p>
              </div>
              <details class="text-left">
                <summary class="text-xs cursor-pointer hover:text-foreground">View diagram code</summary>
                <pre class="text-xs mt-2 p-3 bg-background rounded border overflow-x-auto"><code>${chart}</code></pre>
              </details>
            </div>
          `
        }
      }
    }

    renderDiagram()
  }, [chart, isInitialized, resolvedTheme])

  return (
    <div 
      ref={containerRef} 
      className={`mermaid-container overflow-x-auto ${className}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '200px'
      }}
    />
  )
} 