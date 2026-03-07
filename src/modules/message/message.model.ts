import { ObjectIdSchema } from '@/shared/models/other.model'
import z from 'zod'

export const MessageSchema = z.object({
  _id: ObjectIdSchema,
  conversationId: ObjectIdSchema,
  senderId: ObjectIdSchema,
  content: z.string(),
  imgUrl: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})
export const SendDirectMessageBodySchema = z.object({
  conversationId: ObjectIdSchema.optional(),
  content: z.string().optional(),
  recipientId: ObjectIdSchema,
})

export const SendGroupMessageBodySchema = SendDirectMessageBodySchema.omit({ recipientId: true })

export const SenDirectMessageResSchema = MessageSchema

export type MessageType = z.infer<typeof MessageSchema>
export type SendDirectMessageBodyType = z.infer<typeof SendDirectMessageBodySchema>
export type SendDirectMessageResType = z.infer<typeof SenDirectMessageResSchema>
export type SendGroupMessageBodyType = z.infer<typeof SendGroupMessageBodySchema>
