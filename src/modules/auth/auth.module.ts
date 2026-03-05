import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PassportModule } from '@nestjs/passport'
import { JwtStrategy } from '@/modules/auth/strategy/jwt.strategy'
import { LocalStrategy } from '@/modules/auth/strategy/local.strategy'
import { AuthRepository } from '@/modules/auth/auth.repository'

@Module({
  imports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
