import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
const mongooseDelete = require('mongoose-delete')

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  username: string

  @Prop({ required: true, unique: true, trim: true, lowercase: true })
  email: string

  @Prop({ required: true, select: false })
  password: string

  @Prop({ required: true, trim: true })
  displayName: string

  @Prop()
  avatarUrl?: string

  @Prop()
  avatarId?: string

  @Prop({ maxLength: 500 })
  bio?: string

  @Prop({ sparse: true })
  phone: string
}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.plugin(mongooseDelete, {
  deletedAt: true,
  index: true,
})
