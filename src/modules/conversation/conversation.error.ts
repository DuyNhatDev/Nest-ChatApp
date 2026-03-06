import { BadRequestException } from '@nestjs/common'

export const MissGroupNameOrMemberIdException = new BadRequestException({
  message: 'Tên nhóm và danh sách thành viên là bắt buộc',
  code: 'MISS_GROUP_NAME_OR_MEMBER_ID',
})

export const InvalidConversationTypeException = new BadRequestException({
  message: 'Conversation type không hợp lệ',
  code: 'INVALID_CONVERSATION_TYPE',
})
