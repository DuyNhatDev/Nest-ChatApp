import { EmptyContentException } from '@/modules/message/message.error'
import {
  MessageType,
  SendDirectMessageBodyType,
  SendGroupMessageBodyType,
} from '@/modules/message/message.model'
import { MessageRepository } from '@/modules/message/message.repository'
import { ConversationDocument } from '@/schemas/conversation.schema'
import { Injectable } from '@nestjs/common'

type SendDirectMessageType = SendDirectMessageBodyType & { senderId: string }
type SendGroupMessageType = SendGroupMessageBodyType & {
  senderId: string
  conversation: ConversationDocument
}

@Injectable()
export class MessageService {
  constructor(private readonly messageRepository: MessageRepository) {}

  async sendDirectMessage({
    recipientId,
    content,
    conversationId,
    senderId,
  }: SendDirectMessageType) {
    if (!content) {
      throw EmptyContentException
    }
    let conversation: ConversationDocument | null = null
    if (conversationId) {
      conversation = await this.messageRepository.findConversationById({ conversationId })
    }
    if (!conversation) {
      conversation = await this.messageRepository.createConversation({ senderId, recipientId })
    }
    const messageCreated = await this.messageRepository.createMessage({
      conversationId: conversation._id.toString(),
      senderId,
      content,
    })
    this.updateConversationAfterCreateMessage({ conversation, message: messageCreated, senderId })
    await conversation.save()
    return {
      message: 'Gửi tin nhắn thành công',
      ...messageCreated,
    }
  }

  async sendGroupMessage({
    senderId,
    content,
    conversationId,
    conversation,
  }: SendGroupMessageType) {
    if (!content) {
      throw EmptyContentException
    }
    const message = await this.messageRepository.createMessage({
      conversationId,
      senderId,
      content,
    })
    this.updateConversationAfterCreateMessage({ conversation, message, senderId })
    await conversation.save()
    return {
      message: 'Gửi tin nhắn thành công',
      data: message,
    }
  }

  updateConversationAfterCreateMessage({
    conversation,
    message,
    senderId,
  }: {
    conversation: ConversationDocument
    message: MessageType
    senderId: string
  }) {
    conversation.set({
      seenBy: [],
      lastMessageAt: (message as any).createdAt,
      lastMessage: {
        _id: message._id,
        content: message.content,
        senderId,
        createdAt: (message as any).createdAt,
      },
    })
    conversation.participants.forEach((p) => {
      const memberId = p.userId.toString()
      const isSender = memberId === senderId.toString()
      const preCount = conversation.unreadCounts.get(memberId) || 0
      conversation.unreadCounts.set(memberId, isSender ? 0 : preCount + 1)
    })
  }
}
