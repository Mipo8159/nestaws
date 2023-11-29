import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeModule } from './recipe/recipe.module';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from '@app/modules';
import { JoiConfig } from '@app/configs';
import { LogLevel, LoggerEnum, LoggerModule } from '@app/logger';
import { HealthModule } from './health/health.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { HttpExceptionFilter } from '@app/common';
import { AllExceptionFilter } from '@app/common/filters/all-exception.filter';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: JoiConfig(),
    }),
    LoggerModule.forRoot({
      service: 'nestaws',
      engine: LoggerEnum.WINSTON,
      level: LogLevel.INFO,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 100,
    }),
    DatabaseModule,
    RecipeModule,
    HealthModule,
    AuthModule,
    UserModule,
    S3Module,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
