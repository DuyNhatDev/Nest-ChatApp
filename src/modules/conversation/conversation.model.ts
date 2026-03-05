import { ObjectIdSchema } from '@/shared/models/other.model'
import z from 'zod'

export const ConversationTypeSchema = z.enum(['direct', 'group'])

export const ParticipantSchema = z.object({
  userId: ObjectIdSchema,
  joinedAt: z.date().default(() => new Date()),
})

export const LastMessageSchema = z.object({
  _id: z.string(),
  content: z.string().nullable().default(null),
  senderId: ObjectIdSchema.nullable().default(null),
  createdAt: z.date().nullable().default(null),
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
  lastMessage: LastMessageSchema.nullable().default(null),
  unreadCount: z.record(z.string(), z.number().int().min(0)).default({}),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export type GroupType = z.infer<typeof GroupSchema>
export type ConversationType = z.infer<typeof ConversationSchema>
export type ParticipantType = z.infer<typeof ParticipantSchema>
export type LastMessageType = z.infer<typeof LastMessageSchema>
