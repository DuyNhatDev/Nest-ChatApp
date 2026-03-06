import { Module } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { ConversationController } from './conversation.controller'
import { ConversationRepository } from '@/modules/conversation/conversation.repository'

@Module({
  controllers: [ConversationController],
  providers: [ConversationService, ConversationRepository],
})
export class ConversationModule {}
