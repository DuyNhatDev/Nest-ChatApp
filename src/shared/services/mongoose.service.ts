import { Conversation } from '@/schemas/conversation.schema'
import { FriendRequest } from '@/schemas/friend-request.schema'
import { Friend } from '@/schemas/friend.schema'
import { Message } from '@/schemas/message.schema'
import { Session } from '@/schemas/session.schema'
import { User } from '@/schemas/user.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Model } from 'mongoose'
@Injectable()
export class MongooseService {
  constructor(
    @InjectModel(User.name) readonly user: Model<User>,
    @InjectModel(Session.name) readonly session: Model<Session>,
    @InjectModel(Message.name) readonly message: Model<Message>,
    @InjectModel(Conversation.name) readonly conversation: Model<Conversation>,
    @InjectModel(Friend.name) readonly friend: Model<Friend>,
    @InjectModel(FriendRequest.name) readonly friendRequest: Model<FriendRequest>,
  ) {}
}
