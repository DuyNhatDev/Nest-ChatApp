import { BadRequestException, NotFoundException } from '@nestjs/common'

export const CannotFriendSelfException = new BadRequestException({
  message: 'Không thể kết bạn với chính mình',
})

export const UserNotFoundException = new NotFoundException({
  message: 'Người dùng không tồn tại',
})

export const AlreadyFriendException = new BadRequestException({
  message: 'Hai người đã là bạn bè',
})
