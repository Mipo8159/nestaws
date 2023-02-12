import { MigrationInterface, QueryRunner } from 'typeorm';

export class updatedImage1675670022276 implements MigrationInterface {
  name = 'updatedImage1675670022276';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "recipes" ADD "image" character varying`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "recipes" DROP COLUMN "image"`);
  }
}
