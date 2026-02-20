import { UserSchema } from '@/modules/user/user.model'
import { MessageResSchema } from '@/shared/models/response.model'
import { z } from 'zod'

export const SignUpBodySchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
}).extend({
  firstName: z.string().min(1, { message: 'Họ không được để trống' }).max(100).trim(),
  lastName: z.string().min(1, { message: 'Tên không được để trống' }).max(100).trim(),
})

export const SignUpResSchema = MessageResSchema

export const SignInBodySchema = UserSchema.pick({
  username: true,
  password: true,
})

export const SignInResSchema = z.object({
  accessToken: z.string(),
  user: UserSchema.pick({
    _id: true,
    displayName: true,
    email: true,
    avatarUrl: true,
  }),
})

export type RegisterBodyType = z.infer<typeof SignUpBodySchema>
export type RegisterResType = z.infer<typeof SignUpResSchema>
export type SignInBodyType = z.infer<typeof SignInBodySchema>
export type SignInResType = z.infer<typeof SignInResSchema>
