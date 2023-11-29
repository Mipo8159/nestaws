import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import { PROVIDERS } from '@app/common';
import { ClientConfiguration } from 'aws-sdk/clients/acm';
import { S3 } from 'aws-sdk';

type S3ModuleAsyncOptions = {
  useFactory: (
    ...args: any[]
  ) => Promise<ClientConfiguration> | ClientConfiguration;
} & Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider, 'inject'>;

@Module({
  imports: [],
})
export class S3ModuleClass {
  static registerAsync({
    useFactory,
    imports,
    inject,
  }: S3ModuleAsyncOptions): DynamicModule {
    const s3Provider = {
      provide: PROVIDERS.S3_CLIENT,
      useFactory: async (...args) => {
        const { region, credentials } = await useFactory(...args);
        return new S3({ region, credentials });
      },
      inject,
    };

    return {
      module: S3ModuleClass,
      imports,
      providers: [s3Provider],
      exports: [s3Provider],
    };
  }
}
