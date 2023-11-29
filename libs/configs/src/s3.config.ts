import { S3ModuleClass } from '@app/modules';
import { ConfigModule, ConfigService } from '@nestjs/config';

export const S3Config = S3ModuleClass.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (config: ConfigService) => {
    return {
      region: config.get<string>('S3_NESTAWS_REGION'),
      credentials: {
        accessKeyId: config.get<string>('S3_ACCESS_KEY'),
        secretAccessKey: config.get<string>('S3_SECRET_KEY'),
      },
    };
  },
});
