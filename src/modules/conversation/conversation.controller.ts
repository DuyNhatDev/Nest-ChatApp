import { Controller, Get, Post, UseGuards } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post()
  @UseGuards(FriendshipGuard)
  createConversation() {}

  @Get()
  getConversations() {}

  @Get(':conversationId/messages')
  getMessages() {}
}
