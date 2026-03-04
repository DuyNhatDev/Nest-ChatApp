import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type MessageDocument = HydratedDocument<Message>

@Schema({ timestamps: true })
export class Message {
  @Prop({ ref: 'Conversation', type: Types.ObjectId, required: true, index: true })
  conversationId: Types.ObjectId

  @Prop({ ref: 'User', required: true })
  senderId: Types.ObjectId

  @Prop({ trim: true })
  content: string

  @Prop()
  imgUrl: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)

MessageSchema.index({ conversationId: 1, createdAt: -1 })
