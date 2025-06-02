import { Client } from '@notionhq/client'
import { 
  BlockObjectResponse, 
  PageObjectResponse,
  DatabaseObjectResponse 
} from '@notionhq/client/build/src/api-endpoints'
import { cache } from 'react'

const notion = new Client({
  auth: process.env.NOTION_SECRET,
})

type BlockWithChildren = BlockObjectResponse & { 
  children?: BlockWithChildren[] 
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  description: string
  tags: string[]
  status: string
  publishedAt: string
  cover?: string
  author?: string
  url: string
}

export const discoverDatabases = cache(async () => {
  try {
    const response = await notion.search({
      filter: {
        value: 'database',
        property: 'object'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      }
    })
    
    return response.results
  } catch (error) {
    console.error('Error discovering databases:', error)
    return []
  }
})

export const getAllPosts = cache(async (): Promise<BlogPost[]> => {
  try {
    const databases = await discoverDatabases()
    const allPosts: BlogPost[] = []

    for (const db of databases) {
      try {
        const posts = await getPostsFromDatabase(db.id)
        allPosts.push(...posts)
      } catch (error) {
        console.log(`Skipping database ${db.id}:`, error)
      }
    }

    return allPosts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
})

const getPostsFromDatabase = async (databaseId: string): Promise<BlogPost[]> => {
  try {
    const response = await notion.databases.query({
      database_id: databaseId,
      page_size: 100
    })

    return response.results
      .filter((page) => 'properties' in page)
      .map((page) => extractPostData(page as PageObjectResponse))
      .filter((post) => post.title) // Only include posts with titles
  } catch (error) {
    console.error(`Error fetching posts from database ${databaseId}:`, error)
    return []
  }
}

export const getAllPages = cache(async (): Promise<BlogPost[]> => {
  try {
    const response = await notion.search({
      filter: {
        value: 'page',
        property: 'object'
      },
      sort: {
        direction: 'descending',
        timestamp: 'last_edited_time'
      },
      page_size: 100
    })

    return response.results
      .filter((page) => 'properties' in page)
      .map((page) => extractPostData(page as PageObjectResponse))
      .filter((post) => post.title)
  } catch (error) {
    console.error('Error fetching pages:', error)
    return []
  }
})

export const getAllContent = cache(async (): Promise<BlogPost[]> => {
  try {
    console.log('🔍 Auto-discovering content from your Notion workspace...')
    
    const [databasePosts, individualPages] = await Promise.all([
      getAllPosts(),
      getAllPages()
    ])

    const allContent = [...databasePosts, ...individualPages]
    const uniqueContent = allContent.filter((post, index, self) => 
      index === self.findIndex(p => p.id === post.id)
    )

    console.log(`✅ Found ${uniqueContent.length} pieces of content`)
    return uniqueContent.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  } catch (error) {
    console.error('❌ Error fetching content:', error)
    return []
  }
})

export const getPostBySlug = cache(async (slug: string): Promise<BlogPost | null> => {
  try {
    const allContent = await getAllContent()
    return allContent.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error fetching post by slug:', error)
    return null
  }
})

export const getPageContent = cache(async (pageId: string): Promise<BlockObjectResponse[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      page_size: 100
    })

    return response.results as BlockObjectResponse[]
  } catch (error) {
    console.error('Error fetching page content:', error)
    return []
  }
})

export const getPageContentWithChildren = cache(async (pageId: string): Promise<BlockWithChildren[]> => {
  try {
    const blocks = await getPageContent(pageId)
    
    const blocksWithChildren = await Promise.all(
      blocks.map(async (block): Promise<BlockWithChildren> => {
        if (block.has_children) {
          const children = await getBlockChildren(block.id)
          return {
            ...block,
            children
          }
        }
        return block
      })
    )
    
    return blocksWithChildren
  } catch (error) {
    console.error('Error fetching page content with children:', error)
    return []
  }
})

export const getBlockChildren = cache(async (blockId: string): Promise<BlockWithChildren[]> => {
  try {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      page_size: 100
    })

    const blocks = response.results as BlockObjectResponse[]
    
    const blocksWithChildren = await Promise.all(
      blocks.map(async (block): Promise<BlockWithChildren> => {
        if (block.has_children) {
          const children = await getBlockChildren(block.id)
          return {
            ...block,
            children
          }
        }
        return block
      })
    )
    
    return blocksWithChildren
  } catch (error) {
    console.error(`Error fetching children for block ${blockId}:`, error)
    return []
  }
})

export const getTableContent = cache(async (tableBlockId: string): Promise<any[]> => {
  try {
    const children = await getBlockChildren(tableBlockId)
    return children.filter(block => block.type === 'table_row')
  } catch (error) {
    console.error('Error fetching table content:', error)
    return []
  }
})

function extractPostData(page: PageObjectResponse): BlogPost {
  const properties = page.properties

  const getRichText = (property: any): string => {
    if (property?.rich_text && property.rich_text.length > 0) {
      return property.rich_text[0].plain_text || ''
    }
    return ''
  }

  const getTitle = (property: any): string => {
    if (property?.title && property.title.length > 0) {
      return property.title[0].plain_text || ''
    }
    return ''
  }

  const getMultiSelect = (property: any): string[] => {
    if (property?.multi_select) {
      return property.multi_select.map((item: any) => item.name)
    }
    return []
  }

  const getSelect = (property: any): string => {
    return property?.select?.name || ''
  }

  const getDate = (property: any): string => {
    return property?.date?.start || property?.created_time || new Date().toISOString()
  }

  const getFile = (property: any): string | undefined => {
    if (property?.files && property.files.length > 0) {
      const file = property.files[0]
      return file.file?.url || file.external?.url
    }
    return undefined
  }

  const title = getTitle(properties.Title) || 
                getTitle(properties.Name) || 
                getTitle(properties.title) || 
                getTitle(properties.name) ||
                Object.values(properties).find(prop => prop.type === 'title')?.title?.[0]?.plain_text ||
                'Untitled'

  const slug = getRichText(properties.Slug) || 
               getRichText(properties.slug) ||
               title.toLowerCase()
                   .replace(/[^a-z0-9]+/g, '-')
                   .replace(/(^-|-$)/g, '')

  const description = getRichText(properties.Description) ||
                     getRichText(properties.description) ||
                     getRichText(properties.Summary) ||
                     getRichText(properties.summary) ||
                     getRichText(properties.Excerpt) ||
                     getRichText(properties.excerpt) ||
                     ''

  const tags = getMultiSelect(properties.Tags) ||
               getMultiSelect(properties.tags) ||
               getMultiSelect(properties.Categories) ||
               getMultiSelect(properties.categories) ||
               []

  const status = getSelect(properties.Status) ||
                getSelect(properties.status) ||
                getSelect(properties.Published) ||
                'Published' // Default to published

  const publishedAt = getDate(properties.PublishedAt) ||
                     getDate(properties.Published) ||
                     getDate(properties.Date) ||
                     getDate(properties.date) ||
                     getDate(properties.CreatedAt) ||
                     getDate(properties.created_time) ||
                     page.created_time

  const cover = getFile(properties.Cover) ||
               getFile(properties.cover) ||
               getFile(properties.Image) ||
               getFile(properties.image) ||
               getFile(properties.Thumbnail) ||
               getFile(properties.thumbnail)

  const author = getRichText(properties.Author) ||
                getRichText(properties.author) ||
                getRichText(properties.CreatedBy) ||
                'Ozzy'

  return {
    id: page.id,
    title,
    slug,
    description,
    tags,
    status,
    publishedAt,
    cover,
    author,
    url: `https://notion.so/${page.id.replace(/-/g, '')}`
  }
}

export function blocksToMarkdown(blocks: BlockObjectResponse[]): string {
  return blocks.map(blockToMarkdown).join('\n\n')
}

function blockToMarkdown(block: BlockObjectResponse): string {
  const { type } = block
  
  switch (type) {
    case 'paragraph':
      return richTextToMarkdown(block.paragraph.rich_text)
    
    case 'heading_1':
      return `# ${richTextToMarkdown(block.heading_1.rich_text)}`
    
    case 'heading_2':
      return `## ${richTextToMarkdown(block.heading_2.rich_text)}`
    
    case 'heading_3':
      return `### ${richTextToMarkdown(block.heading_3.rich_text)}`
    
    case 'bulleted_list_item':
      return `- ${richTextToMarkdown(block.bulleted_list_item.rich_text)}`
    
    case 'numbered_list_item':
      return `1. ${richTextToMarkdown(block.numbered_list_item.rich_text)}`
    
    case 'code':
      const language = block.code.language || 'text'
      const code = richTextToMarkdown(block.code.rich_text)
      return `\`\`\`${language}\n${code}\n\`\`\``
    
    case 'quote':
      return `> ${richTextToMarkdown(block.quote.rich_text)}`
    
    case 'divider':
      return '---'
    
    case 'image':
      let imageUrl = ''
      if ('file' in block.image && block.image.file) {
        imageUrl = block.image.file.url
      } else if ('external' in block.image && block.image.external) {
        imageUrl = block.image.external.url
      }
      const caption = block.image.caption ? richTextToMarkdown(block.image.caption) : ''
      return `![${caption}](${imageUrl})`
    
    default:
      return ''
  }
}

function richTextToMarkdown(richText: any[]): string {
  return richText.map((text) => {
    let content = text.plain_text
    
    if (text.annotations.bold) {
      content = `**${content}**`
    }
    if (text.annotations.italic) {
      content = `*${content}*`
    }
    if (text.annotations.code) {
      content = `\`${content}\``
    }
    if (text.annotations.strikethrough) {
      content = `~~${content}~~`
    }
    if (text.href) {
      content = `[${content}](${text.href})`
    }
    
    return content
  }).join('')
} 

