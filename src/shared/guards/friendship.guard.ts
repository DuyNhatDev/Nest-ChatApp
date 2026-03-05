import { CanActivate, ExecutionContext, Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import { Request } from 'express'
import { MongooseService } from '@/shared/services/mongoose.service'

@Injectable()
export class CheckFriendshipGuard implements CanActivate {
  constructor(private readonly mongooseService: MongooseService) {}

  private pair(a: string, b: string) {
    return a < b ? [a, b] : [b, a]
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const user = request.user as { userId: string }
    const me = user.userId.toString()
    const recipientId = request.body?.recipientId ?? null
    //const memberIds = request.body?.memberIds ?? []

    //if (!recipientId && memberIds.length === 0) {
    if (!recipientId) {
      throw new BadRequestException({
        message: 'Cần cung cấp recipientId hoặc memberId',
        code: 'MISSING_RECIPIENT_ID_OR_MEMBER_ID',
      })
    }

    // chat 1-1
    if (recipientId) {
      const [userA, userB] = this.pair(me, recipientId)

      const isFriend = await this.mongooseService.friend.exists({ userA, userB })

      if (!isFriend) {
        throw new ForbiddenException({
          message: 'Bạn chưa kết bạn với người này',
          code: 'NOT_FRIEND',
        })
      }

      return true
    }

    // group
    // const checks = await Promise.all(
    //   memberIds.map(async (memberId: string) => {
    //     const [userA, userB] = this.pair(me, memberId)
    //     const friend = await this.mongooseService.friend.exists({ userA, userB })
    //     return friend ? null : memberId
    //   }),
    // )

    // const notFriends = checks.filter(Boolean)

    // if (notFriends.length > 0) {
    //   throw new ForbiddenException({
    //     message: 'Bạn chỉ có thể thêm bạn bè vào nhóm.',
    //     notFriends,
    //   })
    // }

    return true
  }
}
