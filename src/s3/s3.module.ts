import { PROVIDERS } from '@app/common';
import { S3Config } from '@app/configs';
import { S3Service } from '@app/services';
import { Module } from '@nestjs/common';
import { S3Controller } from './s3.controller';

@Module({
  imports: [S3Config],
  controllers: [S3Controller],
  providers: [
    {
      provide: PROVIDERS.S3_SERVICE,
      useClass: S3Service,
    },
  ],
})
export class S3Module {}
