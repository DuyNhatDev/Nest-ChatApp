import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type FriendRequestDocument = HydratedDocument<FriendRequest>

@Schema({ timestamps: true })
export class FriendRequest {
  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  from: Types.ObjectId

  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  to: Types.ObjectId

  @Prop({ maxLength: 300 })
  message?: string
}

export const FriendRequestSchema = SchemaFactory.createForClass(FriendRequest)

FriendRequestSchema.index({ from: 1, to: 1 }, { unique: true })

FriendRequestSchema.index({ from: 1 })

FriendRequestSchema.index({ to: 1 })
