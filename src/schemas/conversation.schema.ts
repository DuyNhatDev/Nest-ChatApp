import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type ConversationDocument = HydratedDocument<Conversation>

enum ConversationType {
  DIRECT = 'direct',
  GROUP = 'group',
}

@Schema({ _id: false })
export class Participant {
  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  userId: Types.ObjectId

  @Prop({ default: Date.now })
  joinedAt: Date
}

export const ParticipantSchema = SchemaFactory.createForClass(Participant)

@Schema({ _id: true })
export class LastMessage {
  @Prop()
  _id: string

  @Prop({ default: null })
  content: string

  @Prop({ ref: 'User', type: Types.ObjectId })
  senderId: Types.ObjectId

  @Prop({ default: null })
  createdAt: Date
}

export const LastMessageSchema = SchemaFactory.createForClass(LastMessage)

@Schema({ _id: false })
export class Group {
  @Prop({ trim: true })
  name: string

  @Prop()
  avatarGroupUrl?: string

  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  createdBy: Types.ObjectId
}

export const GroupSchema = SchemaFactory.createForClass(Group)

@Schema({ timestamps: true })
export class Conversation {
  @Prop({ enum: ConversationType, required: true })
  type: string

  @Prop({ type: [ParticipantSchema], required: true, default: [] })
  participants: Participant[]

  @Prop({ type: GroupSchema })
  group: Group

  @Prop()
  lastMessageAt?: Date

  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
  seenBy: Types.ObjectId[]

  @Prop({ type: LastMessageSchema, default: null })
  lastMessage: LastMessage

  @Prop({ type: Map, of: Number, default: {} })
  unreadCounts: Map<string, number>
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation)
