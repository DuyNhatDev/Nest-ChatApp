import { AuthRepository } from '@/modules/auth/auth.repository'
import { UserRepository } from '@/modules/user/user.repository'
import { Conversation, ConversationSchema } from '@/schemas/conversation.schema'
import { FriendRequest, FriendRequestSchema } from '@/schemas/friend-request.schema'
import { Friend, FriendSchema } from '@/schemas/friend.schema'
import { Message, MessageSchema } from '@/schemas/message.schema'
import { Session, SessionSchema } from '@/schemas/session.schema'
import { User, UserSchema } from '@/schemas/user.schema'
import { HashingService } from '@/shared/services/hashing.service'
import { MongooseService } from '@/shared/services/mongoose.service'
import { TokenService } from '@/shared/services/token.service'
import { Global, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'

const sharedServices = [MongooseService, HashingService, TokenService, UserRepository, AuthRepository]

const mongooseModels = [
  { name: User.name, schema: UserSchema },
  { name: Session.name, schema: SessionSchema },
  { name: Message.name, schema: MessageSchema },
  { name: Conversation.name, schema: ConversationSchema },
  { name: Friend.name, schema: FriendSchema },
  { name: FriendRequest.name, schema: FriendRequestSchema },
]

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongooseModule.forFeature(mongooseModels), JwtModule],
})
export class SharedModule {}
