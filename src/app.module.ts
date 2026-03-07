import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { MongooseConfig } from '@/config/mongoose.config'
import { HttpExceptionFilter } from '@/shared/filters/http-exception.filter'
import { TransformInterceptor } from '@/shared/interceptors/transform.interceptor'
import { CustomZodValidationPipe } from '@/shared/pipes/custom-zod-validation.pipe'
import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'
import { AuthGuard } from '@/shared/guards/auth.guard'
import { FriendModule } from './modules/friend/friend.module'
import { MessageModule } from './modules/message/message.module'
import { ConversationModule } from './modules/conversation/conversation.module'

@Module({
  imports: [
    SharedModule,
    MongooseConfig,
    AuthModule,
    UserModule,
    FriendModule,
    MessageModule,
    ConversationModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    { provide: APP_FILTER, useClass: HttpExceptionFilter },
    { provide: APP_PIPE, useClass: CustomZodValidationPipe },
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
})
export class AppModule {}
