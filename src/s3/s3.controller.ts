import { PROVIDERS, User } from '@app/common';
import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IS3Service } from '@app/interfaces';
import { Throttle } from '@nestjs/throttler';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('s3')
@Controller('s3')
export class S3Controller {
  constructor(
    @Inject(PROVIDERS.S3_SERVICE) private readonly s3Service: IS3Service,
  ) {}

  @Get('get-signed-url/:ext')
  @Throttle(20, 60)
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  getSignedUrl(@User('id') user_id: number, @Param('ext') ext: string) {
    return this.s3Service.getSignedUrl(user_id, ext);
  }
}
