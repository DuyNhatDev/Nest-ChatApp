import { MessageType } from '@/modules/message/message.model'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class MessageRepository {
  constructor(private readonly mongooseService: MongooseService) {}

  findConversationById({ conversationId }: { conversationId: string }) {
    return this.mongooseService.conversation.findById(conversationId)
  }

  createConversation({ senderId, recipientId }: { senderId: string; recipientId: string }) {
    return this.mongooseService.conversation.create({
      type: 'direct',
      participants: [
        { userId: senderId, joinedAt: new Date() },
        { userId: recipientId, joinedAt: new Date() },
      ],
      lastMessageAt: new Date(),
      unreadCounts: new Map(),
    })
  }

  async createMessage(data: { conversationId: string; senderId: string; content: string }): Promise<MessageType> {
    const message = await this.mongooseService.message.create(data)
    return message.toObject() as unknown as MessageType
  }
}
