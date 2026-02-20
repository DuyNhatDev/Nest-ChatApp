import { UserAlreadyExistsException } from '@/modules/auth/auth.error'
import { RegisterBodyType, SignInBodyType } from '@/modules/auth/auth.model'
import { AuthRepository } from '@/modules/auth/auth.reppsitory'
import { UserType } from '@/modules/user/user.model'
import { UserRepository } from '@/modules/user/user.repo'
import { isUniqueConstraintMongoError } from '@/shared/helpers'
import { HashingService } from '@/shared/services/hashing.service'
import { TokenService } from '@/shared/services/token.service'
import { AccessTokenPayloadCreate } from '@/shared/types/jwt.type'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly tokenService: TokenService,
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

  async signIn({ _id, displayName, email, avatarUrl }: Omit<UserType, 'password'>) {
    const tokens = await this.generateTokens({
      userId: _id,
    })
    return {
      message: 'Đăng nhập thành công',
      ...tokens,
      user: { _id, displayName, email, avatarUrl },
    }
  }

  async validateUser({ username, password }: SignInBodyType) {
    const user = await this.authRepository.findUniqueUser({
      username,
    })
    if (!user) {
      return null
    }
    const isPasswordMatch = await this.hashingService.compare(password, user.password)
    if (!isPasswordMatch) {
      return null
    }
    return user
  }

  async generateTokens({ userId }: AccessTokenPayloadCreate) {
    const accessToken = this.tokenService.signAccessToken({ userId })
    const refreshToken = this.tokenService.signRefreshToken({ userId })
    const decodedRefreshToken = await this.tokenService.verifyRefreshToken(refreshToken)
    await this.authRepository.createRefreshToken({
      userId,
      refreshToken,
      expiresAt: new Date(decodedRefreshToken.exp * 1000),
    })
    return { accessToken, refreshToken }
  }
}
