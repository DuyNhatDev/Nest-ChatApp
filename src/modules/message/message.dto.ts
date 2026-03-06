import { SendDirectMessageBodySchema, SenDirectMessageResSchema } from '@/modules/message/message.model'
import { createZodDto } from 'nestjs-zod'

export class SendDirectMessageBodyDto extends createZodDto(SendDirectMessageBodySchema) {}

export class SendDirectMessageResDto extends createZodDto(SenDirectMessageResSchema) {}
