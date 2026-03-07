import {
  ConversationType,
  CreateConversationBodyType,
} from '@/modules/conversation/conversation.model'
import { MongooseService } from '@/shared/services/mongoose.service'
import { MessageFilterType } from '@/shared/types/message.type'
import { Injectable } from '@nestjs/common'
import { last } from 'rxjs'

@Injectable()
export class ConversationRepository {
  constructor(private readonly mongooseService: MongooseService) {}

  findConversation({ userId, participantId }: { userId: string; participantId: string }) {
    return this.mongooseService.conversation.findOne({
      type: 'direct',
      'participants.userId': { $all: [userId, participantId] },
    })
  }

  findConversationsOfUser({ userId }: { userId: string }) {
    return this.mongooseService.conversation
      .find({ 'participants.userId': userId })
      .sort({
        lastMessageAt: -1,
        updatedAt: -1,
      })
      .populate({
        path: 'participants.userId',
        select: 'displayName avatarUrl',
      })
      .populate({
        path: 'seenBy',
        select: 'displayName avatarUrl',
      })
      .lean()
  }

  createConversation(data: Partial<ConversationType>) {
    return this.mongooseService.conversation.create(data)
  }

  getMessages({ filter, limit }: { filter: MessageFilterType; limit: number }) {
    return this.mongooseService.message
      .find(filter)
      .sort({ createdAt: -1 })
      .limit(limit + 1)
  }
}
