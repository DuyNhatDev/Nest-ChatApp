import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'
import {
  CreateConversationBodyDTO,
  GetMessagesQueryDTO,
} from '@/modules/conversation/conversation.dto'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post()
  @UseGuards(FriendshipGuard)
  createConversation(
    @ActiveUser('userId') userId: string,
    @Body() body: CreateConversationBodyDTO,
  ) {
    return this.conversationService.createConversation({ ...body, userId })
  }

  @Get()
  getConversations(@ActiveUser('userId') userId: string) {
    return this.conversationService.getConversations({ userId })
  }

  @Get(':conversationId/messages')
  getMessages(
    @Param('conversationId') conversationId: string,
    @Query() query: GetMessagesQueryDTO,
  ) {
    return this.conversationService.getMessages({ conversationId, ...query })
  }
}
