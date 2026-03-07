import {
  CreateConversationBodySchema,
  GetMessagesQuerySchema,
} from '@/modules/conversation/conversation.model'
import { createZodDto } from 'nestjs-zod'

export class CreateConversationBodyDTO extends createZodDto(CreateConversationBodySchema) {}

export class GetMessagesQueryDTO extends createZodDto(GetMessagesQuerySchema) {}
