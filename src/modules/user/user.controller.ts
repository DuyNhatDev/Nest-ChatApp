import { Controller, Get, Req } from '@nestjs/common'
import { UserService } from './user.service'
import type { Request as ExpressRequest } from 'express'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('/me')
  getMe(@Req() req: ExpressRequest) {
    const authHeader = req.headers.authorization
    if (!authHeader) return null
    const accessToken = authHeader.split(' ')[1]
    return this.userService.getMe(accessToken)
  }
}
