import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ZodResponse } from 'nestjs-zod';
import { Public } from '@/shared/decorators/auth.decorator';
import { SignUpBodyDTO, SignUpResDTO } from '@/modules/auth/auth.dto';

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
}
