import { AuthRepository } from '@/modules/auth/auth.reppsitory'
import { UserRepository } from '@/modules/user/user.repo'
import { User, UserSchema } from '@/schemas/user.schema'
import { HashingService } from '@/shared/services/hashing.service'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

const sharedServices = [MongooseService, HashingService, UserRepository, AuthRepository]

const mongooseModels = [{ name: User.name, schema: UserSchema }]

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongooseModule.forFeature(mongooseModels)],
})
export class SharedModule {}
