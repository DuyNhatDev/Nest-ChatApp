import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common'
import { ConversationService } from './conversation.service'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'
import { CreateConversationBodyDto } from '@/modules/conversation/conversation.dto'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('conversations')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}
  @Post()
  @UseGuards(FriendshipGuard)
  // createConversation(@Body() body: CreateConversationBodyDto, @ActiveUser('userId') userId: string) {
  //   return this.conversationService.createConversation({ ...body, userId })
  // }

  @Get()
  getConversations() {}

  @Get(':conversationId/messages')
  getMessages() {}
}
