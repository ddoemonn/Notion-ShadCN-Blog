import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { format } from "date-fns"
import { getPostBySlug, getPageContentWithChildren, getAllContent } from "@/lib/notion"
import { NotionRenderer } from "@/components/notion-renderer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ArrowLeft, ExternalLink, Calendar, User, Clock } from "lucide-react"

interface BlogPostPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  const posts = await getAllContent()
  
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  
  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: post.cover ? [post.cover] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.cover ? [post.cover] : [],
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const blocks = await getPageContentWithChildren(post.id)
  const formattedDate = format(new Date(post.publishedAt), "MMMM d, yyyy")

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      

      <article className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="py-8 pb-0 space-y-8">
          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            {post.title}
          </h1>

          {/* Description */}
          {post.description && (
            <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">
              {post.description}
            </p>
          )}
        </header>

        {/* Cover Image */}
        {post.cover && (
          <div className="mb-16">
            <div className="relative h-[50vh] rounded-lg overflow-hidden border">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <section className="pb-16">
          {blocks && blocks.length > 0 ? (
            <div className="prose prose-lg max-w-none">
              <NotionRenderer blocks={blocks} />
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Content Loading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  This post exists but the content is still being processed.
                </p>
                <Button asChild>
                  <Link href={post.url} target="_blank">
                    View in Notion →
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Footer Navigation */}
        <footer className="border-t py-12">
          <div className="flex justify-center">
            <Button variant="outline" asChild>
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                All Posts
              </Link>
            </Button>
          </div>
        </footer>
      </article>
    </div>
  )
} 
