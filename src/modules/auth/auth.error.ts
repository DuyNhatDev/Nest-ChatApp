import { ConflictException, UnauthorizedException, ForbiddenException } from '@nestjs/common'

export const UserAlreadyExistsException = new ConflictException({
  message: 'Lỗi xác thực',
  code: 'USER_ALREADY_EXISTS',
  errors: [{ field: 'username', message: 'Tên người dùng đã được đăng ký' }],
})

export const EmailAlreadyExistsException = new ConflictException({
  message: 'Lỗi xác thực',
  code: 'EMAIL_ALREADY_EXISTS',
  errors: [{ field: 'email', message: 'Email đã được đăng ký' }],
})

export const InvalidInformationLogin = new UnauthorizedException({
  message: 'Lỗi xác thực',
  code: 'INVALID_LOGIN_INFO',
  errors: [{ field: 'password', message: 'Tên đăng nhập hoặc mật khẩu không chính xác' }],
})

export const ForbiddenAccessException = new ForbiddenException({
  message: 'Bạn không có quyền truy cập',
  code: 'FORBIDDEN_ACCESS',
})

export const NotTokenException = new UnauthorizedException({
  message: 'Không tìm thấy token',
  code: 'NOT_TOKEN',
})

export const InvalidTokenException = new UnauthorizedException({
  message: 'Token không hợp lệ',
  code: 'INVALID_TOKEN',
})

export const TokenExpiredException = new UnauthorizedException({
  message: 'Token đã hết hạn',
  code: 'TOKEN_EXPIRED',
})

export const RefreshTokenAlreadyUsedException = new UnauthorizedException({
  message: 'Refresh Token đã được sử dụng',
  code: 'REFRESH_TOKEN_ALREADY_USED',
})

export const UnauthorizedAccessException = new UnauthorizedException({
  message: 'Lỗi UnauthorizedAccess',
  code: 'UNAUTHORIZED_ACCESS',
})
