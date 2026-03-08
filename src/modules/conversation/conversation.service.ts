import {
  InvalidConversationTypeException,
  MissGroupNameOrMemberIdException,
} from '@/modules/conversation/conversation.error'
import {
  CreateConversationBodyType,
  GetMessagesQueryType,
} from '@/modules/conversation/conversation.model'
import { ConversationRepository } from '@/modules/conversation/conversation.repository'
import { ConversationDocument } from '@/schemas/conversation.schema'
import { convertStringToObjectId } from '@/shared/helpers'
import { MessageFilterType } from '@/shared/types/message.type'
import { Injectable } from '@nestjs/common'
import { Types } from 'mongoose'

type CreateConversationType = CreateConversationBodyType & { userId: string }
type GetMessagesType = { conversationId: string } & GetMessagesQueryType

@Injectable()
export class ConversationService {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async createConversation({ type, name, memberIds, userId }: CreateConversationType) {
    if (
      !type ||
      (type === 'group' && !name) ||
      !memberIds ||
      !Array.isArray(memberIds) ||
      memberIds.length === 0
    ) {
      throw MissGroupNameOrMemberIdException
    }
    let conversation: ConversationDocument | null = null
    if (type === 'direct') {
      const participantId = memberIds[0]
      conversation = await this.conversationRepository.findConversation({ userId, participantId })
      if (!conversation) {
        conversation = await this.conversationRepository.createConversation({
          type: 'direct',
          participants: [{ userId }, { userId: participantId }],
          lastMessageAt: new Date(),
        })
      }
    }

    if (type === 'group') {
      conversation = await this.conversationRepository.createConversation({
        type: 'group',
        participants: [{ userId }, ...memberIds.map((id) => ({ userId: id }))],
        group: { name, createdBy: userId },
        lastMessageAt: new Date(),
      })
    }
    if (!conversation) {
      throw InvalidConversationTypeException
    }

    await conversation.populate([
      { path: 'participants.userId', select: 'displayName avatarUrl' },
      { path: 'seenBy', select: 'displayName avatarUrl' },
      { path: 'lastMessage.senderId', select: 'displayName avatarUrl' },
    ])

    const conversationPlain = conversation.toObject()
    return {
      message: 'Tạo cuộc hội thoại thành công',
      ...conversationPlain,
    }
  }

  async getConversations({ userId }: { userId: string }) {
    const conversations = await this.conversationRepository.findConversationsOfUser({ userId })
    const formatted = conversations.map((c) => {
      const participants = (c.participants || []).map((p) => {
        const user = p.userId as any
        return {
          _id: user?._id,
          displayName: user?.displayName,
          avatarUrl: user?.avatarUrl ?? null,
          joinedAt: p.joinedAt,
        }
      })
      return {
        ...c,
        unreadCounts: c.unreadCounts || {},
        participants,
      }
    })
    return formatted
  }

  async getMessages({ conversationId, limit = 50, cursor }: GetMessagesType) {
    const filter: MessageFilterType = {
      conversationId: convertStringToObjectId(conversationId),
    }
    if (cursor) {
      filter.createdAt = { $lt: new Date(cursor) }
    }
    let messages = await this.conversationRepository.getMessages({ filter, limit })
    let nextCursor: string | null = null
    if (messages.length > limit) {
      const nextMessage = messages[messages.length - 1]
      nextCursor = (nextMessage as any).createdAt.toISOString()
      messages.pop()
    }
    messages = messages.reverse()
    return {
      messages,
      nextCursor,
    }
  }
}
