import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common'
import { FriendService } from './friend.service'
import { ZodResponse } from 'nestjs-zod'
import {
  AcceptFriendRequestResDTO,
  GetAllFriendRequestsResDTO,
  GetAllFriendsResDTO,
  SendFriendRequestBodyDTO,
  SendFriendRequestResDTO,
} from '@/modules/friend/friend.dto'
import { MessageResDTO } from '@/shared/dtos/response.dto'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('requests')
  @ZodResponse({ type: SendFriendRequestResDTO })
  sendFriendRequest(@ActiveUser('userId') userId: string, @Body() body: SendFriendRequestBodyDTO) {
    const { to, message } = body
    return this.friendService.sendFriendRequest({ from: userId, to, message })
  }

  @Post('requests/:requestId/accept')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: AcceptFriendRequestResDTO })
  acceptFriendRequest(@ActiveUser('userId') userId: string, @Param('requestId') requestId: string) {
    return this.friendService.acceptFriendRequest({ requestId, userId })
  }

  @Post('requests/:requestId/decline')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: MessageResDTO })
  declineFriendRequest(
    @ActiveUser('userId') userId: string,
    @Param('requestId') requestId: string,
  ) {
    return this.friendService.declineFriendRequest({ requestId, userId })
  }

  @Get()
  @ZodResponse({ type: GetAllFriendsResDTO })
  getAllFriends(@ActiveUser('userId') userId: string) {
    return this.friendService.getAllFriends({ userId })
  }

  @Get('requests')
  @ZodResponse({ type: GetAllFriendRequestsResDTO })
  getAllFriendRequests(@ActiveUser('userId') userId: string) {
    return this.friendService.getAllFriendRequests({ userId })
  }
}
