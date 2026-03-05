import { FriendRequestType, FriendType } from '@/modules/friend/friend.model'
import { UserType } from '@/modules/user/user.model'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Injectable } from '@nestjs/common'

type AllFriendsType = {
  _id: string
  userA: Pick<UserType, '_id' | 'displayName' | 'avatarUrl'>
  userB: Pick<UserType, '_id' | 'displayName' | 'avatarUrl'>
}

type AllFriendRequestsSentType = {
  _id: string
  from: string
  to: Pick<UserType, '_id' | 'username' | 'displayName' | 'avatarUrl'>
}

type AllFriendRequestsReceivedType = {
  _id: string
  from: Pick<UserType, '_id' | 'username' | 'displayName' | 'avatarUrl'>
  to: string
}
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

  async createFriendRequest(data: { from: string; to: string; message?: string }): Promise<FriendRequestType> {
    const request = await this.mongooseService.friendRequest.create(data)
    return request.toObject() as unknown as FriendRequestType
  }

  findFriendRequestById({ requestId }: { requestId: string }): Promise<FriendRequestType | null> {
    return this.mongooseService.friendRequest.findById(requestId).lean<FriendRequestType>()
  }

  async createFriendship({ userA, userB }: { userA: string; userB: string }): Promise<FriendType> {
    const friendship = await this.mongooseService.friend.create({ userA, userB })
    return friendship.toObject() as unknown as FriendType
  }

  async deleteFriendRequest({ requestId }: { requestId: string }) {
    return this.mongooseService.friendRequest.findByIdAndDelete(requestId).lean<FriendRequestType>()
  }

  getUserAfterAcceptFriendRequest({
    userId,
  }: {
    userId: string
  }): Promise<Pick<UserType, '_id' | 'displayName' | 'avatarUrl'> | null> {
    return this.mongooseService.user
      .findById(userId)
      .select('_id displayName avatarUrl')
      .lean<Pick<UserType, '_id' | 'displayName' | 'avatarUrl'>>()
  }

  getAllFriends({ userId }: { userId: string }): Promise<AllFriendsType[]> {
    return this.mongooseService.friend
      .find({ $or: [{ userA: userId }, { userB: userId }] })
      .populate('userA', '_id displayName avatarUrl')
      .populate('userB', '_id displayName avatarUrl')
      .lean<AllFriendsType[]>()
  }

  getAllFriendRequestsSent({ userId }: { userId: string }): Promise<AllFriendRequestsSentType[]> {
    return this.mongooseService.friendRequest
      .find({ from: userId })
      .populate('to', '_id username displayName avatarUrl')
      .lean<AllFriendRequestsSentType[]>()
  }

  getAllFriendRequestsReceived({ userId }: { userId: string }): Promise<AllFriendRequestsReceivedType[]> {
    {
      return this.mongooseService.friendRequest
        .find({ to: userId })
        .populate('from', '_id username displayName avatarUrl')
        .lean<AllFriendRequestsReceivedType[]>()
    }
  }
}
