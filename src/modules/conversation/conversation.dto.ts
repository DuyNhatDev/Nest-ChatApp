import { CreateConversationBodySchema } from "@/modules/conversation/conversation.model";
import { createZodDto } from "nestjs-zod";

export class CreateConversationBodyDto extends createZodDto(CreateConversationBodySchema) {}
