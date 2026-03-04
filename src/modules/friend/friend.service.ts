import { CannotFriendSelfException, UserNotFoundException } from '@/modules/friend/friend.error'
import { SendFriendRequestBodyType } from '@/modules/friend/friend.model'
import { UserRepository } from '@/modules/user/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class FriendService {
  constructor(private readonly userRepository: UserRepository) {}
  async sendFriendRequest({ to, message, from }: SendFriendRequestBodyType & { from: string }) {
    if (from === to) {
      throw CannotFriendSelfException
    }
    const userExist = await this.userRepository.checkExist({ _id: to })
    if (!userExist) {
      throw UserNotFoundException
    }
    let userA = from.toString()
    let userB = to.toString()
    if (userA > userB) {
      [userA, userB] = [userB, userA]
    }
  }
}
