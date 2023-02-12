import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions } from '@nestjs/jwt';

export const JwtConfig = async (
  config: ConfigService,
): Promise<JwtModuleOptions> => ({
  secret: config.get<string>('JWT_ACCESS_SECRET'),
  signOptions: {
    expiresIn: config.get<string>('JWT_ACCESS_EXPIRE'),
  },
});
