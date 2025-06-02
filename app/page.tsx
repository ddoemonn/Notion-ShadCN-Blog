import Link from "next/link"
import Image from "next/image"
import { getAllContent } from "@/lib/notion"
import { Button } from "@/components/ui/button"
import { BlogPostCard } from "@/components/blog-post-card"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Mail } from "lucide-react"
import { BlogSearch } from "@/components/blog-search"

export default async function BlogPage() {
  const posts = await getAllContent()
  
  const userName = process.env.USER_NAME || "Ozzy"
  const userRole = process.env.USER_ROLE || "Frontend Engineer"
  const userDescription = process.env.USER_DESCRIPTION || "I love crafting good UI/UX"
  const userAvatar = process.env.USER_AVATAR || "/avatar.jpg"
  const userEmail = process.env.USER_EMAIL

  return (
    <div className="min-h-screen">
      {/* Hero Section with Personal Info */}
      <section className="border-b bg-gradient-to-br from-background via-background to-muted/20">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-background shadow-lg">
                <Image
                  src={userAvatar}
                  alt={userName}
                  width={112}
                  height={112}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>
            </div>

            {/* Name and Role */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
                  Hey, I'm {userName}
                </h1>
                <Badge variant="secondary" className="text-sm font-medium px-4 py-1 mt-4">
                  {userRole}
                </Badge>
              </div>
              
              <p className="text-lg md:text-xl mt-4 text-muted-foreground max-w-xl mx-auto">
                {userDescription}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <main className="max-w-6xl mx-auto px-6 py-16">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Thoughts</h2>
            
          </div>

          {/* Search and Posts - Client Component */}
          <BlogSearch posts={posts} userEmail={userEmail} />
        </div>
      </main>
    </div>
  )
}