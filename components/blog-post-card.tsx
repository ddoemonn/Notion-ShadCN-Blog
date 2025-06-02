import Link from "next/link"
import Image from "next/image"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CalendarDays, ExternalLink, User, ArrowUpRight } from "lucide-react"
import { BlogPost } from "@/lib/notion"

interface BlogPostCardProps {
  post: BlogPost
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const formattedDate = formatDistanceToNow(new Date(post.publishedAt), { addSuffix: true })

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Cover Image */}
      {post.cover && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.cover}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
        </div>
      )}

      <CardHeader className="space-y-4">
        {/* Tags */}
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary"
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 2 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 2}
              </Badge>
            )}
          </div>
        )}

        {/* Date */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="h-3 w-3" />
          <span>{formattedDate}</span>
        </div>

        {/* Title */}
        <CardTitle className="line-clamp-2 text-xl leading-tight group-hover:text-primary transition-colors">
          <Link href={`/blog/${post.slug}`} className="hover:underline">
            {post.title}
          </Link>
        </CardTitle>

        {/* Description */}
        {post.description && (
          <CardDescription className="line-clamp-3 text-sm leading-relaxed">
            {post.description}
          </CardDescription>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Author */}
        <div className="flex items-center justify-end">
          
          
          {/* Read More Button */}
          <Button asChild variant="ghost" size="sm" className="group/button">
            <Link href={`/blog/${post.slug}`}>
              <span className="text-sm">Read</span>
              <ArrowUpRight className="h-3 w-3 ml-1 transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
} 