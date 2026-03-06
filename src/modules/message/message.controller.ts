import { Body, Controller, Post, UseGuards } from '@nestjs/common'
import { MessageService } from './message.service'
import { SendDirectMessageBodyDto, SendDirectMessageResDto } from '@/modules/message/message.dto'
import { FriendshipGuard } from '@/shared/guards/friendship.guard'
import { ZodResponse } from 'nestjs-zod'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
  @Post('direct')
  @UseGuards(FriendshipGuard)
  @ZodResponse({ type: SendDirectMessageResDto })
  sendDirectMessage(@ActiveUser('userId') userId: string, @Body() body: SendDirectMessageBodyDto) {
    return this.messageService.sendDirectMessage({ senderId: userId, ...body })
  }
}
