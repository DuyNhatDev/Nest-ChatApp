import { SendDirectMessageBodySchema } from "@/modules/message/message.model";
import { createZodDto } from "nestjs-zod";

export class SendDirectMessageBodyDto extends createZodDto(SendDirectMessageBodySchema) {}