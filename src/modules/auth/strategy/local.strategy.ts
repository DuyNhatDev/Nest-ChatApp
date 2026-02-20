import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { AuthService } from '@/modules/auth/auth.service'
import { UserType } from '@/modules/user/user.model'
import { InvalidInformationLogin } from '@/modules/auth/auth.error'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'username',
      passwordField: 'password',
    })
  }

  async validate(username: string, password: string): Promise<UserType> {
    const user = await this.authService.validateUser({ username, password })
    if (!user) {
      throw InvalidInformationLogin
    }
    return user
  }
}
