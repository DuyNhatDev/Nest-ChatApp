import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req } from '@nestjs/common'
import { FriendService } from './friend.service'
import { ZodResponse } from 'nestjs-zod'
import {
  AcceptFriendRequestResDTO,
  GetAllFriendRequestsResDTO,
  GetAllFriendsResDTO,
  SendFriendRequestBodyDTO,
  SendFriendRequestResDTO,
} from '@/modules/friend/friend.dto'
import type { Request } from 'express'
import { MessageResDTO } from '@/shared/dtos/response.dto'

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('requests')
  @ZodResponse({ type: SendFriendRequestResDTO })
  sendFriendRequest(@Req() req: Request & { user: { userId: string } }, @Body() body: SendFriendRequestBodyDTO) {
    const { userId: from } = req.user
    const { to, message } = body
    return this.friendService.sendFriendRequest({ from, to, message })
  }

  @Post('requests/:requestId/accept')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: AcceptFriendRequestResDTO })
  acceptFriendRequest(@Req() req: Request & { user: { userId: string } }, @Param('requestId') requestId: string) {
    const { userId } = req.user
    return this.friendService.acceptFriendRequest({ requestId, userId })
  }

  @Post('requests/:requestId/decline')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: MessageResDTO })
  declineFriendRequest(@Req() req: Request & { user: { userId: string } }, @Param('requestId') requestId: string) {
    const { userId } = req.user
    return this.friendService.declineFriendRequest({ requestId, userId })
  }

  @Get()
  @ZodResponse({ type: GetAllFriendsResDTO })
  getAllFriends(@Req() req: Request & { user: { userId: string } }) {
    const { userId } = req.user
    return this.friendService.getAllFriends({ userId })
  }

  @Get('requests')
  @ZodResponse({ type: GetAllFriendRequestsResDTO })
  getAllFriendRequests(@Req() req: Request & { user: { userId: string } }) {
    const { userId } = req.user
    return this.friendService.getAllFriendRequests({ userId })
  }
}
