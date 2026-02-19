import { UserSchema } from '@/modules/user/user.model'
import { TypeOfVerificationCode } from '@/shared/constants/auth.constant'
import { MessageResSchema } from '@/shared/models/response.model'
import { last } from 'rxjs'
import { z } from 'zod'

export const SignUpBodySchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
})
  .extend({
    firstName: z.string().min(1, { message: 'Họ không được để trống' }).max(100).trim(),
    lastName: z.string().min(1, { message: 'Tên không được để trống' }).max(100).trim(),
  })
  

export const SignUpResSchema = MessageResSchema


export type RegisterBodyType = z.infer<typeof SignUpBodySchema>
export type RegisterResType = z.infer<typeof SignUpResSchema>
