import { Body, Controller, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import type { Request as ExpressRequest } from 'express'
import { SendDirectMessageBodyDto } from '@/modules/message/message.dto'
import { CheckFriendshipGuard } from '@/shared/guards/friendship.guard'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('direct')
  @UseGuards(CheckFriendshipGuard)
  sendDirectMessage(
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Body() body: SendDirectMessageBodyDto,
  ) {
    const { userId } = req.user
    return this.messageService.sendDirectMessage({ senderId: userId, ...body })
  }
}
