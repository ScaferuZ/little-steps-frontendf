import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  type: z.boolean(),
  category: z.string().min(1, 'Category is required'),
  thumbnailUri: z.string().optional(),
  videoUri: z.string().optional()
})
