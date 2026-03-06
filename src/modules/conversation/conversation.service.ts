import { CreateConversationBodyType } from '@/modules/conversation/conversation.model'
import { ConversationRepository } from '@/modules/conversation/conversation.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConversationService {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  async createConversation({ type, name, memberIds }: CreateConversationBodyType) {}
}
