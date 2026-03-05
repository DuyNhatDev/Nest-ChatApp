import { BadRequestException } from '@nestjs/common'

export const EmptyContentException = new BadRequestException({
  message: 'Thiếu nội dung',
  code: 'EMPTY_CONTENT',
})
