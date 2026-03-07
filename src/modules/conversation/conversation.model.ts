import { ObjectIdSchema } from '@/shared/models/other.model'
import z from 'zod'

export const ConversationTypeSchema = z.enum(['direct', 'group'])

export const ParticipantSchema = z.object({
  userId: ObjectIdSchema,
  joinedAt: z
    .date()
    .default(() => new Date())
    .optional(),
})

export const LastMessageSchema = z.object({
  _id: z.string(),
  content: z.string().optional(),
  senderId: ObjectIdSchema.optional(),
  createdAt: z.date().optional(),
})

export const GroupSchema = z.object({
  name: z.string().trim().min(1).max(100),
  avatarGroupUrl: z.string().optional(),
  createdBy: ObjectIdSchema,
})

export const ConversationSchema = z.object({
  _id: ObjectIdSchema,
  type: ConversationTypeSchema,
  participants: z.array(ParticipantSchema).default([]),
  group: GroupSchema,
  lastMessageAt: z.date().optional(),
  seenBy: z.array(ObjectIdSchema),
  lastMessage: LastMessageSchema.optional(),
  unreadCount: z.record(z.string(), z.number().int().min(0)).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const CreateConversationBodySchema = z.object({
  type: ConversationTypeSchema,
  name: z.string(),
  memberIds: z.array(ObjectIdSchema),
})

export const GetMessagesQuerySchema = z.object({
  limit: z.coerce.number().int().positive().default(50),
  cursor: z.string().optional(),
})

export type GroupType = z.infer<typeof GroupSchema>
export type ConversationType = z.infer<typeof ConversationSchema>
export type ParticipantType = z.infer<typeof ParticipantSchema>
export type LastMessageType = z.infer<typeof LastMessageSchema>
export type CreateConversationBodyType = z.infer<typeof CreateConversationBodySchema>
export type GetMessagesQueryType = z.infer<typeof GetMessagesQuerySchema>
