import { UserRepository } from '@/modules/user/user.repository'
import { TokenService } from '@/shared/services/token.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async getMe(userId: string) {
    return this.userRepository.findUnique({ _id: userId })
  }
}
