import { z } from 'zod'

export const MessageResSchema = z.object({
  message: z.string(),
})

export const MetaSchema = z.object({
  totalItems: z.number(),
  page: z.number(), // Số trang hiện tại
  limit: z.number(), // Số item trên 1 trang
  totalPages: z.number(), // Tổng số trang
})

export type MessageResType = z.infer<typeof MessageResSchema>
export type MetaType = z.infer<typeof MetaSchema>
