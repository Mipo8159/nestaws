import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoiConfig } from '@app/config/joi.config';
import { AuthModule } from './modules/auth/auth.module';
import { TokenModule } from './modules/token/token.module';
import { RecipeModule } from './modules/recipe/recipe.module';
import { UserModule } from './modules/user/user.module';
import { Recipe } from './modules/recipe/entities/recipe.entity';
import { Ingredient } from './modules/recipe/entities/ingredient.entity';
import { User } from './modules/user/entities/user.entity';
import { Token } from './modules/token/entities/token.entity';
import { S3Module } from './modules/s3/s3.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validationSchema: JoiConfig(),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: config.get<'postgres' | 'mysql'>('POSTGRES_TYPE'),
        host: config.get<string>('POSTGRES_HOST'),
        port: config.get<number>('POSTGRES_PORT'),
        username: config.get<string>('POSTGRES_USER'),
        password: config.get<string>('POSTGRES_PASSWORD'),
        database: config.get<string>('POSTGRES_DB'),
        synchronize: false,
        logging: true,
        entities: [Recipe, Ingredient, User, Token],
        migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      }),
    }),
    AuthModule,
    TokenModule,
    RecipeModule,
    UserModule,
    S3Module,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
