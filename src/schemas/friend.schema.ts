import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument, Types } from 'mongoose'

export type FriendDocument = HydratedDocument<Friend>

@Schema({ timestamps: true })
export class Friend {
  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  userA: Types.ObjectId

  @Prop({ ref: 'User', type: Types.ObjectId, required: true })
  userB: Types.ObjectId
}

export const FriendSchema = SchemaFactory.createForClass(Friend)

FriendSchema.pre('save', async function (next) {
  const a = this.userA.toString()
  const b = this.userB.toString()
  if (a > b) {
    this.userA = new Types.ObjectId(b)
    this.userB = new Types.ObjectId(a)
  }
})

FriendSchema.index({ userA: 1, userB: 1 }, { unique: true })
