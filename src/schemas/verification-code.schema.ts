import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'

export type VerificationCodeDocument = HydratedDocument<VerificationCode>

export enum VerificationCodeType {
  REGISTER = 'REGISTER',
  RESET_PASSWORD = 'RESET_PASSWORD',
}

@Schema({ timestamps: true })
export class VerificationCode {
  @Prop()
  email: string

  @Prop()
  code: string

  @Prop({ enum: VerificationCodeType })
  type: VerificationCodeType

  @Prop({ required: true })
  expiresAt: Date
}

export const VerificationCodeSchema = SchemaFactory.createForClass(VerificationCode)

VerificationCodeSchema.index({ email: 1, type: 1 }, { unique: true })

VerificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 300 })
