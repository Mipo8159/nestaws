import { ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Token } from '@app/modules/token/entities/token.entity';
import { User } from '@app/modules/user/entities/user.entity';
import { Ingredient } from '@app/modules/recipe/entities/ingredient.entity';
import { Recipe } from '@app/modules/recipe/entities/recipe.entity';
import { initial1675635589731 } from '@app/migrations/1675635589731-initial';
import { updatedImage1675670022276 } from '@app/migrations/1675670022276-updatedImage';

dotenv.config();
const config = new ConfigService();

export default new DataSource({
  type: config.get<'postgres' | 'mysql'>('POSTGRES_TYPE'),
  host: config.get<string>('POSTGRES_HOST'), // localhost on migration:generate
  port: config.get<number>('POSTGRES_PORT'), // 5435 on migration:generate
  username: config.get<string>('POSTGRES_USER'),
  password: config.get<string>('POSTGRES_PASSWORD'),
  database: config.get<string>('POSTGRES_DB'),
  entities: [Recipe, Ingredient, User, Token],
  migrations: [initial1675635589731, updatedImage1675670022276],
});

// const dataSource: Promise<DataSource> = (async () =>
//   new DataSource(await TypeormConfig()))();
// export default dataSource;
