'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Video, Music, File } from 'lucide-react'

export function ImageBlock({ block }: { block: any }) {
  let imageUrl = ''
  let caption = ''
  
  if (block.type === 'file' && block.file) {
    imageUrl = block.file.url
  } else if (block.type === 'external' && block.external) {
    imageUrl = block.external.url
  }
  
  if (block.caption && block.caption.length > 0) {
    caption = block.caption.map((text: any) => text.plain_text).join('')
  }
  
  if (!imageUrl) return null
  
  return (
    <div className="my-8">
      <div className="relative rounded-lg overflow-hidden border">
        <Image
          src={imageUrl}
          alt={caption || 'Image'}
          width={800}
          height={400}
          className="w-full h-auto"
        />
      </div>
      {caption && (
        <p className="text-center text-sm text-muted-foreground mt-3 italic">
          {caption}
        </p>
      )}
    </div>
  )
}

export function VideoBlock({ block }: { block: any }) {
  let videoUrl = ''
  
  if (block.type === 'file' && block.file) {
    videoUrl = block.file.url
  } else if (block.type === 'external' && block.external) {
    videoUrl = block.external.url
  }
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Video className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-base text-foreground">Video Content</p>
            {videoUrl && (
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={videoUrl} target="_blank">
                  Watch Video
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function AudioBlock({ block }: { block: any }) {
  let audioUrl = ''
  
  if (block.type === 'file' && block.file) {
    audioUrl = block.file.url
  } else if (block.type === 'external' && block.external) {
    audioUrl = block.external.url
  }
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <Music className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-base text-foreground">Audio Content</p>
            {audioUrl && (
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={audioUrl} target="_blank">
                  Play Audio
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function FileBlock({ block }: { block: any }) {
  let fileUrl = ''
  let fileName = 'File'
  
  if (block.type === 'file' && block.file) {
    fileUrl = block.file.url
  } else if (block.type === 'external' && block.external) {
    fileUrl = block.external.url
  }
  
  if (block.name) {
    fileName = block.name
  }
  
  return (
    <Card className="my-6">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <File className="h-6 w-6 text-primary" />
          <div>
            <p className="font-semibold text-base text-foreground">{fileName}</p>
            {fileUrl && (
              <Button variant="link" asChild className="p-0 h-auto">
                <Link href={fileUrl} target="_blank">
                  Download
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 