import { BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common'

export const CannotFriendSelfException = new BadRequestException({
  message: 'Không thể kết bạn với chính mình',
  code: 'CANNOT_FRIEND_SELF',
})

export const UserNotFoundException = new NotFoundException({
  message: 'Người dùng không tồn tại',
  code: 'USER_NOT_FOUND',
})

export const AlreadyFriendException = new BadRequestException({
  message: 'Hai người đã là bạn bè',
  code: 'ALREADY_FRIEND',
})

export const AlreadyRequestException = new BadRequestException({
  message: 'Đã gửi lời mời kết bạn',
  code: 'ALREADY_REQUEST',
})

export const FriendRequestNotFoundException = new NotFoundException({
  message: 'Không tìm thấy lời mời kết bạn',
  code: 'FRIEND_REQUEST_NOT_FOUND',
})

export const ForbiddenExceptFriendRequestException = new ForbiddenException({
  message: 'Bạn không có quyền chấp nhận lời mời này',
  code: 'FORBIDDEN_ACCEPT_FRIEND_REQUEST',
})

export const ForbiddenDeclineFriendRequestException = new ForbiddenException({
  message: 'Bạn không có quyền từ chối lời mời này',
  code: 'FORBIDDEN_DECLINE_FRIEND_REQUEST',
})
