import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Request } from '@nestjs/common'
import { FriendService } from './friend.service'
import { ZodResponse } from 'nestjs-zod'
import {
  AcceptFriendRequestResDTO,
  GetAllFriendRequestsResDTO,
  GetAllFriendsResDTO,
  SendFriendRequestBodyDTO,
  SendFriendRequestResDTO,
} from '@/modules/friend/friend.dto'
import type { Request as ExpressRequest } from 'express'
import { MessageResDTO } from '@/shared/dtos/response.dto'

@Controller('friends')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('requests')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: SendFriendRequestResDTO })
  sendFriendRequest(
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Body() body: SendFriendRequestBodyDTO,
  ) {
    const { userId: from } = req.user
    const { to, message } = body
    return this.friendService.sendFriendRequest({ from, to, message })
  }

  @Post('requests/:requestId/accept')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: AcceptFriendRequestResDTO })
  acceptFriendRequest(
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Param('requestId') requestId: string,
  ) {
    const { userId } = req.user
    return this.friendService.acceptFriendRequest({ requestId, userId })
  }

  @Post('requests/:requestId/decline')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: MessageResDTO })
  declineFriendRequest(
    @Request() req: ExpressRequest & { user: { userId: string } },
    @Param('requestId') requestId: string,
  ) {
    const { userId } = req.user
    return this.friendService.declineFriendRequest({ requestId, userId })
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: GetAllFriendsResDTO })
  getAllFriends(@Request() req: ExpressRequest & { user: { userId: string } }) {
    const { userId } = req.user
    return this.friendService.getAllFriends({ userId })
  }

  @Get('requests')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: GetAllFriendRequestsResDTO })
  getAllFriendRequests(@Request() req: ExpressRequest & { user: { userId: string } }) {
    const { userId } = req.user
    return this.friendService.getAllFriendRequests({ userId })
  }
}
