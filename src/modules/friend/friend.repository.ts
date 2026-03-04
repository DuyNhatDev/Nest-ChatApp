import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FriendRepository {
  constructor(private readonly mongooseService: MongooseService) {}

  checkExist({ _id }: { _id: string }) {
    return this.mongooseService.user.exists({ _id })
  }

  checkAlreadyFriend({ userA, userB }: { userA: string; userB: string }) {
    return this.mongooseService.friend.findOne({ userA, userB })
  }

  checkAlreadyRequest({ from, to }: { from: string; to: string }) {
    return this.mongooseService.friendRequest.findOne({
      $or: [
        { from, to },
        { from: to, to: from },
      ],
    })
  }
}
