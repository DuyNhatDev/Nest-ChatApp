import {
  SendDirectMessageBodySchema,
  SendGroupMessageBodySchema,
  SenDirectMessageResSchema,
} from '@/modules/message/message.model'
import { createZodDto } from 'nestjs-zod'

export class SendDirectMessageBodyDTO extends createZodDto(SendDirectMessageBodySchema) {}

export class SendDirectMessageResDTO extends createZodDto(SenDirectMessageResSchema) {}

export class SendGroupMessageBodyDTO extends createZodDto(SendGroupMessageBodySchema) {}
