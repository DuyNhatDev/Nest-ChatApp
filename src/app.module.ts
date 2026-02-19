import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { MongooseConfig } from '@/config/mongoose.config'
import { HttpExceptionFilter } from '@/shared/filters/http-exception.filter'
import { TransformInterceptor } from '@/shared/interceptors/tranform.interceptor'
import CustomZodValidationPipe from '@/shared/pipes/custom-zod-validation.pipe'
import { SharedModule } from '@/shared/shared.module'
import { Module } from '@nestjs/common'
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AuthModule } from './modules/auth/auth.module'
import { UserModule } from './modules/user/user.module'

@Module({
  imports: [SharedModule, MongooseConfig, AuthModule, UserModule],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: TransformInterceptor },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_PIPE,
      useClass: CustomZodValidationPipe,
    },
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
  ],
})
export class AppModule {}
