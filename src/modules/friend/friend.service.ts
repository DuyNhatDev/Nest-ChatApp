import {
  AlreadyFriendException,
  AlreadyRequestException,
  CannotFriendSelfException,
  ForbiddenDeclineFriendRequestException,
  ForbiddenExceptFriendRequestException,
  FriendRequestNotFoundException,
  UserNotFoundException,
} from '@/modules/friend/friend.error'
import { SendFriendRequestBodyType } from '@/modules/friend/friend.model'
import { FriendRepository } from '@/modules/friend/friend.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FriendService {
  constructor(private readonly friendRepository: FriendRepository) {}
  async sendFriendRequest({ to, message, from }: SendFriendRequestBodyType & { from: string }) {
    // 1. Kiểm tra không thể kết bạn với chính mình
    if (from === to) {
      throw CannotFriendSelfException
    }
    // 2. Kiểm tra người nhận có tồn tại không
    const userExist = await this.friendRepository.checkExist({ _id: to })
    if (!userExist) {
      throw UserNotFoundException
    }
    // 3. Chuẩn hóa userA, userB để tránh trường hợp userA = userB nhưng thứ tự khác nhau
    let userA = from.toString()
    let userB = to.toString()
    if (userA > userB) {
      ;[userA, userB] = [userB, userA]
    }
    const [alreadyFriend, alreadyRequest] = await Promise.all([
      this.friendRepository.checkAlreadyFriend({ userA, userB }),
      this.friendRepository.checkAlreadyRequest({ from, to }),
    ])
    // 4. Kiểm tra đã là bạn bè chưa
    if (alreadyFriend) {
      throw AlreadyFriendException
    }
    // 5. Kiểm tra đã gửi lời mời kết bạn chưa
    if (alreadyRequest) {
      throw AlreadyRequestException
    }
    // 6. Tạo lời mời kết bạn
    const friendRequest = await this.friendRepository.createFriendRequest({ from, to, message })
    return {
      message: 'Gửi lời mời kết bạn thành công',
      request: friendRequest,
    }
  }

  async acceptFriendRequest({ requestId, userId }: { requestId: string; userId: string }) {
    // 1. Kiểm tra lời mời kết bạn có tồn tại không
    const request = await this.friendRepository.findFriendRequestById({ requestId })
    if (!request) {
      throw FriendRequestNotFoundException
    }
    // 2. Kiểm tra người chấp nhận có phải là người nhận lời mời không
    if (request.to.toString() !== userId.toString()) {
      throw ForbiddenExceptFriendRequestException
    }
    // 3. Tạo mối quan hệ bạn bè
    await this.friendRepository.createFriendship({
      userA: request.from.toString(),
      userB: request.to.toString(),
    })
    // 4. Xóa lời mời kết bạn
    await this.friendRepository.deleteFriendRequest({ requestId })
    // 5. Trả về thông tin người gửi lời mời kết bạn
    const from = await this.friendRepository.getUserAfterAcceptFriendRequest({ userId: request.from })
    return {
      message: 'Chấp nhận lời mời kết bạn thành công',
      newFriend: {
        _id: from?._id,
        displayName: from?.displayName,
        avatarUrl: from?.avatarUrl,
      },
    }
  }

  async declineFriendRequest({ requestId, userId }: { requestId: string; userId: string }) {
    const request = await this.friendRepository.findFriendRequestById({ requestId })
    if (!request) {
      throw FriendRequestNotFoundException
    }
    // 2. Kiểm tra người từ chối có phải là người nhận lời mời không
    if (request.to.toString() !== userId.toString()) {
      throw ForbiddenDeclineFriendRequestException
    }
    // 3. Xóa lời mời kết bạn
    await this.friendRepository.deleteFriendRequest({ requestId })
    return {
      message: 'Từ chối lời mời kết bạn thành công',
    }
  }

  async getAllFriends({ userId }: { userId: string }) {
    const friendships = await this.friendRepository.getAllFriends({ userId })
    console.log(friendships)
    if (!friendships) {
      return {
        message: 'Chưa có bạn bè',
        data: [],
      }
    }
    const friends = friendships.map((f) => (f.userA._id.toString() === userId ? f.userB : f.userA))
    return {
      message: 'Lấy danh sách bạn bè thành công',
      data: friends,
    }
  }

  async getAllFriendRequests({ userId }: { userId: string }) {
    const [sent, received] = await Promise.all([
      this.friendRepository.getAllFriendRequestsSent({ userId }),
      this.friendRepository.getAllFriendRequestsReceived({ userId }),
    ])
    return {
      message: 'Lấy danh sách lời mời kết bạn thành công',
      data: {
        sent,
        received,
      },
    }
  }
}
