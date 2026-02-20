import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type SessionDocument = HydratedDocument<Session>

@Schema({ timestamps: true })
export class Session {
  @Prop({ required: true, ref: 'User', index: true })
  userId: Types.ObjectId

  @Prop({ required: true, unique: true })
  refreshToken: string

  @Prop({ required: true })
  expiresAt: Date
}

export const SessionSchema = SchemaFactory.createForClass(Session)

SessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 })

SessionSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
})
