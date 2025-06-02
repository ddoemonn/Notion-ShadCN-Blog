"use client"

import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { jsx } from "react-syntax-highlighter/dist/esm/languages/prism"
import { atomDark, coy } from "react-syntax-highlighter/dist/esm/styles/prism" // coy for light, atomDark for dark
import { useEffect, useState } from "react"

SyntaxHighlighter.registerLanguage("jsx", jsx)

interface CodeHighlighterProps {
  codeString: string
  language: string
  className?: string
}

export function CodeHighlighter({ codeString, language, className }: CodeHighlighterProps) {
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const checkTheme = () => {
      const isDark = document.documentElement.classList.contains("dark")
      setIsDarkMode(isDark)
    }

    checkTheme() // Initial check

    const observer = new MutationObserver(checkTheme)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    return () => observer.disconnect() // Cleanup observer on component unmount
  }, [])

  return (
    <div className={className}>
      <SyntaxHighlighter
        language={language}
        style={isDarkMode ? atomDark : coy}
        suppressHydrationWarning
        customStyle={{
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0,
          marginLeft: 0,
          padding: "1rem",
          fontSize: "0.875rem",
          lineHeight: "1.5rem",
          borderRadius: "var(--radius)", // Use shadcn border radius variable
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-mono, monospace)", // Use Tailwind's mono font stack
          },
        }}
      >
        {codeString.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
