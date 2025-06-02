import { BlockObjectResponse } from '@notionhq/client/build/src/api-endpoints'

export type BlockWithChildren = BlockObjectResponse & { 
  children?: BlockWithChildren[] 
}

export interface NotionRendererProps {
  blocks: BlockWithChildren[]
} 