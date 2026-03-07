import { UserRepository } from '@/modules/user/user.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getMe(userId: string) {
    const user = await this.userRepository.findUnique({ _id: userId })
    return {
      message: 'Lấy thông tin người dùng thành công',
      ...user,
    }
  }
}
