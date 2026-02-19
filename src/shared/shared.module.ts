import { User, UserSchema } from '@/schemas/user.schema'
import { MongooseService } from '@/shared/services/mongoose.service'
import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

const sharedServices = [MongooseService]

const mongooseModels = [{ name: User.name, schema: UserSchema }]

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongooseModule.forFeature(mongooseModels)],
})
export class SharedModule {}
