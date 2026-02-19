import { MongooseService } from '@/shared/services/mongoose.service'
import { Global, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

const sharedServices = [MongooseService]

const mongooseModels = []

@Global()
@Module({
  providers: [...sharedServices],
  exports: sharedServices,
  imports: [MongooseModule.forFeature(mongooseModels)],
})
export class SharedModule {}
