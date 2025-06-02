"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlogPostCard } from "@/components/blog-post-card"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Mail, Search } from "lucide-react"

interface BlogSearchProps {
  posts: any[]
  userEmail?: string
}

export function BlogSearch({ posts, userEmail }: BlogSearchProps) {
  const [filteredPosts, setFilteredPosts] = useState(posts)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPosts(posts)
    } else {
      const filtered = posts.filter(post => 
        post.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.tags?.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredPosts(filtered)
    }
  }, [searchTerm, posts])

  return (
    <>
      {/* Search Input */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Posts Grid or Empty State */}
      {filteredPosts.length === 0 ? (
        searchTerm.trim() !== "" ? (
          <Card className="max-w-xl mx-auto border-dashed">
            <CardContent className="text-center py-14 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                <Search className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">No posts found</h3>
                <p className="text-muted-foreground text-sm">
                  No posts match your search for "{searchTerm}". Try different keywords.
                </p>
              </div>
              <Button onClick={() => setSearchTerm("")} variant="outline">
                Clear Search
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card className="max-w-xl mx-auto border-dashed">
            <CardContent className="text-center py-14 space-y-6">
              <div className="w-24 h-24 mx-auto rounded-full bg-muted/50 flex items-center justify-center">
                <BookOpen className="h-12 w-12 text-muted-foreground" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold">Coming Soon</h3>
                <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                  Working on content about frontend development and web technologies.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link href="https://notion.so" target="_blank" className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    Create in Notion
                  </Link>
                </Button>
                {userEmail && (
                  <Button variant="outline" asChild>
                    <Link href={`mailto:${userEmail}`} className="gap-2">
                      <Mail className="h-4 w-4" />
                      Get Notified
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </>
  )
} 