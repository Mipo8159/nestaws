import { dataSourceOptions } from '@app/configs/data.source';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => dataSourceOptions,
    }),
  ],
})
export class DatabaseModule {}
