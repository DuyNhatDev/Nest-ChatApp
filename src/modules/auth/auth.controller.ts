import { Body, Controller, HttpCode, HttpStatus, Post, Request, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ZodResponse } from 'nestjs-zod'
import { Public } from '@/shared/decorators/auth.decorator'
import { SignInResDTO, SignUpBodyDTO, SignUpResDTO } from '@/modules/auth/auth.dto'
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard'
import { UserType } from '@/modules/user/user.model'
import { Request as ExpressRequest } from 'express'
import type { Response } from 'express'
import envConfig from '@/config/env.config'
import ms from 'ms'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: SignUpResDTO })
  register(@Body() body: SignUpBodyDTO) {
    return this.authService.signUp(body)
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: SignInResDTO })
  async signIn(@Request() req: ExpressRequest & { user: UserType }, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signIn(req.user)
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue),
    })
    const { refreshToken, ...response } = result
    return response
  }
}
