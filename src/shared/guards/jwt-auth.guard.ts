import {
  ForbiddenAccessException,
  InvalidTokenException,
  NotTokenException,
  TokenExpiredException,
} from '@/modules/auth/auth.error'
import { IS_PUBLIC_KEY } from '@/shared/decorators/auth.decorator'
import { ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(protected reflector: Reflector) {
    super()
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }
    return super.canActivate(context)
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    if (err) {
      throw ForbiddenAccessException
    }
    if (!user) {
      if (info.name == 'Error') {
        throw NotTokenException
      } else if (info.name === 'JsonWebTokenError') {
        throw InvalidTokenException
      } else if (info.name === 'TokenExpiredError') {
        throw TokenExpiredException
      } else {
        throw ForbiddenAccessException
      }
    }
    return user
  }
}
