import { InternalServerErrorException } from '@nestjs/common'

export const InternalServerException = new InternalServerErrorException({
  message: 'Lỗi hệ thống',
})
