import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import type { Request } from 'express'
import { SendDirectMessageBodyDto } from '@/modules/message/message.dto'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('direct')
  @UseGuards(FriendshipGuard)
  sendDirectMessage(@Req() req: Request & { user: { userId: string } }, @Body() body: SendDirectMessageBodyDto) {
    const { userId } = req.user
    return this.messageService.sendDirectMessage({ senderId: userId, ...body })
  }
}
