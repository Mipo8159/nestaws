import { PROVIDERS } from '@app/common';
import { IPresignUrl, IS3Service } from '@app/interfaces';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3 } from 'aws-sdk';
import { v4 } from 'uuid';

@Injectable()
export class S3Service implements IS3Service {
  constructor(
    @Inject(PROVIDERS.S3_CLIENT) private readonly s3Client: S3,
    private readonly config: ConfigService,
  ) {}

  async getSignedUrl(user_id: number, ext: string): Promise<IPresignUrl> {
    const key = `users/${user_id}/${v4()}.${ext}`;
    try {
      return await this.signUrlPromise(key, ext);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  // PROMISIFY GET SIGNED URL
  private async signUrlPromise(key: string, ext: string): Promise<IPresignUrl> {
    return new Promise((resolve, reject) =>
      this.s3Client.getSignedUrl(
        'putObject',
        {
          Bucket: this.config.get<string>('S3_BUCKET_NESTAWS'),
          ContentType: `image/${ext}`,
          Key: key,
          Expires: 60,
        },
        (err, url) => {
          if (err) {
            reject(err);
          }
          resolve({ key, url });
        },
      ),
    );
  }
}
