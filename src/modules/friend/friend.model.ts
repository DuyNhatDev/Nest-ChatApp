import z from 'zod'
import { ObjectIdSchema } from '@/shared/models/other.model'
import e from 'express'

export const FriendSchema = z.object({
  userA: ObjectIdSchema,
  userB: ObjectIdSchema,
})

export const SendFriendRequestBodySchema = z.object({
  to: ObjectIdSchema,
  message: z.string().max(300).optional(),
})

export type FriendType = z.infer<typeof FriendSchema>
export type SendFriendRequestBodyType = z.infer<typeof SendFriendRequestBodySchema>
