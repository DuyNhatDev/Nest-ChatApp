import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  getMe(@ActiveUser('userId') userId: string) {
    return this.userService.getMe(userId)
  }
}
