import { Types } from 'mongoose'

export type MessageFilterType = {
  conversationId: Types.ObjectId
  createdAt?: {
    $lt: Date
  }
}
