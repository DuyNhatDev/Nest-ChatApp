import z from 'zod'
import { ObjectIdSchema } from '@/shared/models/other.model'

export const UserSchema = z.object({
  _id: ObjectIdSchema,
  username: z.string().min(1, { message: 'Tên người dùng không được để trống' }).max(100).trim(),
  email: z.email({ message: 'Email không hợp lệ' }),
  password: z.string().min(6, { message: 'Mật khẩu phải ít nhất 6 ký tự' }).max(100),
  phone: z.string().min(9).max(15).optional(),
  avatarUrl: z.string().optional(),
  avatarId: z.string().optional(),
  displayName: z.string().min(1, { message: 'Tên hiển thị không được để trống' }).max(100).trim(),
  bio: z.string().max(500).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deleted: z.boolean(),
})

export const UserResSchema = UserSchema.omit({ password: true })

export type UserType = z.infer<typeof UserSchema>
export type UserResType = z.infer<typeof UserResSchema>
