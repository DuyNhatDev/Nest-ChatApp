import { UserAlreadyExistsException } from '@/modules/auth/auth.error'
import { RegisterBodyType } from '@/modules/auth/auth.model'
import { AuthRepository } from '@/modules/auth/auth.reppsitory'
import { UserRepository } from '@/modules/user/user.repo'
import { isUniqueConstraintMongoError } from '@/shared/helpers'
import { HashingService } from '@/shared/services/hashing.service'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    // private readonly tokenService: TokenService,
    // private readonly emailService: EmailService,
  ) {}
  async signUp({ username, email, password, firstName, lastName }: RegisterBodyType) {
    try {
      const user = await this.userRepository.findUnique({ username })
      if (user) {
        throw UserAlreadyExistsException
      } else {
        const hashedPassword = await this.hashingService.hash(password)
        await this.userRepository.create({
          username,
          email,
          password: hashedPassword,
          displayName: `${firstName} ${lastName}`,
        })
      }
      return { message: 'Đăng ký thành công.' }
    } catch (error) {
      if (isUniqueConstraintMongoError(error)) {
        throw UserAlreadyExistsException
      }
      throw error
    }
  }
}
