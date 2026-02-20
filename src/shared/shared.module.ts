import { AuthRepository } from '@/modules/auth/auth.reppsitory'
import { UserRepository } from '@/modules/user/user.repo'
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
]

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongooseModule.forFeature(mongooseModels), JwtModule],
})
export class SharedModule {}
