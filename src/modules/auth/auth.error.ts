import {
  UnprocessableEntityException,
  BadRequestException,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common'

export const InvalidOTPException = new UnprocessableEntityException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'code', message: 'Mã OTP không chính xác' }],
})

export const OTPExpiredException = new BadRequestException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'code', message: 'Mã OTP đã hết hạn' }],
})

export const UserAlreadyExistsException = new ConflictException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'username', message: 'Tên người dùng đã được đăng ký' }],
})

export const EmailNotFoundException = new NotFoundException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'email', message: 'Email không tồn tại' }],
})

export const FailedToSendOTPException = new UnprocessableEntityException({
  message: 'Lỗi khi gửi email',
})

export const InvalidPasswordException = new UnauthorizedException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'password', message: 'Mật khẩu không chính xác' }],
})

export const InvalidInformationLogin = new UnauthorizedException({
  message: 'Lỗi xác thực',
  errors: [{ field: 'password', message: 'Tên đăng nhập hoặc mật khẩu không chính xác' }],
})

export const ForbiddenAccessException = new ForbiddenException({
  message: 'Bạn không có quyền truy cập',
})

export const NotTokenException = new UnauthorizedException({
  message: 'Không có Access Token',
})

export const InvalidTokenException = new UnauthorizedException({
  message: 'Token không hợp lệ',
})

export const TokenExpiredException = new UnauthorizedException({
  message: 'Token đã hết hạn',
})

export const NotVerifiedUserException = new UnauthorizedException({
  message: 'Tài khoản chưa được xác minh',
})

export const BlockedUserException = new UnauthorizedException({
  message: 'Tài khoản đã bị khóa',
})

export const RefreshTokenAlreadyUsedException = new UnauthorizedException({
  message: 'Refresh Token đã được sử dụng',
})

export const UnauthorizedAccessException = new UnauthorizedException({ message: 'Lỗi UnauthorizedAccess' })

export const InvalidResetPasswordTokenException = new UnauthorizedException({
  message: 'Forgot Password Token không hợp lệ',
})

export const ResetPasswordTokenExpiredException = new BadRequestException({
  message: 'Link này đã hết hạn, vui lòng click vào đường link mới nhất mà hệ thống đã gửi đến email của bạn',
})

export const GoogleOAuthException = new BadRequestException({
  message: 'Đã xảy ra lỗi oauth',
})
