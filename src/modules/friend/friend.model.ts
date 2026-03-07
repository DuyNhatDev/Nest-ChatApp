import z from 'zod'
import { ObjectIdSchema } from '@/shared/models/other.model'
import { UserSchema } from '@/modules/user/user.model'

export const FriendRequestSchema = z.object({
  _id: ObjectIdSchema,
  from: ObjectIdSchema,
  to: ObjectIdSchema,
  message: z.string().max(300).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const FriendSchema = z.object({
  userA: ObjectIdSchema,
  userB: ObjectIdSchema,
})

export const SendFriendRequestBodySchema = z
  .object({
    to: ObjectIdSchema,
    message: z.string().max(300).optional(),
  })
  .strict()

export const SendFriendRequestResSchema = z.object({
  request: FriendRequestSchema,
})

export const AcceptFriendRequestResSchema = z.object({
  newFriend: FriendRequestSchema.pick({
    _id: true,
    from: true,
    to: true,
  }).partial(),
})

export const GetAllFriendsResSchema = z.object({
  data: z.array(UserSchema.pick({ _id: true, displayName: true, avatarUrl: true })),
})

export const GetAllFriendRequestsResSchema = z.object({
  data: z.object({
    sent: z.array(
      z.object({
        _id: ObjectIdSchema,
        from: ObjectIdSchema,
        to: UserSchema.pick({ _id: true, username: true, displayName: true, avatarUrl: true }),
        message: z.string().max(300).optional(),
      }),
    ),
    received: z.array(
      z.object({
        _id: ObjectIdSchema,
        from: UserSchema.pick({ _id: true, username: true, displayName: true, avatarUrl: true }),
        to: ObjectIdSchema,
        message: z.string().max(300).optional(),
      }),
    ),
  }),
})

export type FriendRequestType = z.infer<typeof FriendRequestSchema>
export type FriendType = z.infer<typeof FriendSchema>
export type SendFriendRequestBodyType = z.infer<typeof SendFriendRequestBodySchema>
export type SendFriendRequestResType = z.infer<typeof SendFriendRequestResSchema>
export type AcceptFriendRequestResType = z.infer<typeof AcceptFriendRequestResSchema>
export type GetAllFriendsResType = z.infer<typeof GetAllFriendsResSchema>
export type GetAllFriendRequestsResType = z.infer<typeof GetAllFriendRequestsResSchema>
