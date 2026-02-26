import { UserRepository } from '@/modules/user/user.repo'
import { TokenService } from '@/shared/services/token.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
  ) {}
  async getMe(accessToken: string) {
    const { userId } = await this.tokenService.verifyAccessToken(accessToken)
    return this.userRepository.findUnique({ _id: userId })
  }
}
