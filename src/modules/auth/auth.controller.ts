import { Body, Controller, HttpCode, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common'
import { AuthService } from './auth.service'
import { ZodResponse } from 'nestjs-zod'
import { Public } from '@/shared/decorators/auth.decorator'
import {
  RefreshTokenResDTO,
  SignInResDTO,
  SignUpBodyDTO,
  SignUpResDTO,
} from '@/modules/auth/auth.dto'
import { LocalAuthGuard } from '@/shared/guards/local-auth.guard'
import type { Request, Response } from 'express'
import envConfig from '@/config/env.config'
import ms from 'ms'
import { MessageResDTO } from '@/shared/dtos/response.dto'
import { ActiveUser } from '@/shared/decorators/active-user.decorator'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: SignUpResDTO })
  signUp(@Body() body: SignUpBodyDTO) {
    return this.authService.signUp(body)
  }

  @Post('signin')
  @UseGuards(LocalAuthGuard)
  @Public()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: SignInResDTO })
  async signIn(@ActiveUser() user, @Res({ passthrough: true }) res: Response) {
    const result = await this.authService.signIn(user)
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue),
    })
    const { refreshToken, ...response } = result
    return response
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: MessageResDTO })
  signOut(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue),
    })

    return this.authService.signOut({ refreshToken })
  }

  @Post('refresh-token')
  @Public()
  @HttpCode(HttpStatus.OK)
  @ZodResponse({ type: RefreshTokenResDTO })
  async refreshToken(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    const refreshToken = req.cookies?.refreshToken
    const result = await this.authService.refreshToken({ refreshToken })
    const { refreshToken: newRefreshToken, ...response } = result
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: ms(envConfig.REFRESH_TOKEN_EXPIRES_IN as ms.StringValue),
    })
    return response
  }
}
