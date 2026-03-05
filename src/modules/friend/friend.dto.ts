import {
  AcceptFriendRequestResSchema,
  GetAllFriendRequestsResSchema,
  GetAllFriendsResSchema,
  SendFriendRequestBodySchema,
  SendFriendRequestResSchema,
} from '@/modules/friend/friend.model'
import { createZodDto } from 'nestjs-zod'

export class SendFriendRequestBodyDTO extends createZodDto(SendFriendRequestBodySchema) {}
export class SendFriendRequestResDTO extends createZodDto(SendFriendRequestResSchema) {}

export class AcceptFriendRequestResDTO extends createZodDto(AcceptFriendRequestResSchema) {}

export class GetAllFriendsResDTO extends createZodDto(GetAllFriendsResSchema) {}

export class GetAllFriendRequestsResDTO extends createZodDto(GetAllFriendRequestsResSchema) {}
