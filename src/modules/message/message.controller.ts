import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import {
  SendDirectMessageBodyDTO,
  SendDirectMessageResDTO,
  SendGroupMessageBodyDTO,
} from '@/modules/message/message.dto'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'
import { ZodResponse } from 'nestjs-zod'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'
import { GroupMembershipGuard } from '@/shared/guards/group-membership.guard'
import type { Request } from 'express'
import { ConversationDocument } from '@/schemas/conversation.schema'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('direct')
  @UseGuards(FriendshipGuard)
  @ZodResponse({ type: SendDirectMessageResDTO })
  sendDirectMessage(@ActiveUser('userId') userId: string, @Body() body: SendDirectMessageBodyDTO) {
    return this.messageService.sendDirectMessage({ senderId: userId, ...body })
  }
  @Post('group')
  @UseGuards(GroupMembershipGuard)
  // @ZodResponse({ type: SendDirectMessageResDTO })
  sendGroupMessage(
    @ActiveUser('userId') userId: string,
    @Req() req: Request & { conversation: ConversationDocument },
    @Body() body: SendGroupMessageBodyDTO,
  ) {
    const { conversation } = req
    return this.messageService.sendGroupMessage({ senderId: userId, conversation, ...body })
  }
}
