import {
  CanActivate,
  ExecutionContext,
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common'
import { Request } from 'express'
import { MongooseService } from '@/shared/services/mongoose.service'

@Injectable()
export class GroupMembershipGuard implements CanActivate {
  constructor(private readonly mongooseService: MongooseService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>()
    const { conversationId } = request.body
    const userId = (request.user as any).userId
    const conversation = await this.mongooseService.conversation.findById(conversationId)
    if (!conversation) {
      throw new NotFoundException({
        message: 'Không tìm thấy cuộc trò chuyện',
        code: 'CONVERSATION_NOT_FOUND',
      })
    }

    const isMember = conversation.participants.some(
      (p) => p.userId.toString() === userId.toString(),
    )

    if (!isMember) {
      throw new ForbiddenException({
        message: 'Bạn không ở trong group này',
        code: 'NOT_GROUP_MEMBER',
      })
    }
    request['conversation'] = conversation

    return true
  }
}
