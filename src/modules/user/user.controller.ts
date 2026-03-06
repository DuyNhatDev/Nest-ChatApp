import { Controller, Get, Req } from '@nestjs/common'
import { UserService } from './user.service'
import type { Request } from 'express'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  getMe(@Req() req: Request & { user: { userId: string } }) {
    const { userId } = req.user
    return this.userService.getMe(userId)
  }
}
