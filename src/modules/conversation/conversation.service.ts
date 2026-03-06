import {
  InvalidConversationTypeException,
  MissGroupNameOrMemberIdException,
} from '@/modules/conversation/conversation.error'
import { CreateConversationBodyType } from '@/modules/conversation/conversation.model'
import { ConversationRepository } from '@/modules/conversation/conversation.repository'
import { ConversationDocument } from '@/schemas/conversation.schema'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ConversationService {
  constructor(private readonly conversationRepository: ConversationRepository) {}

  
}
