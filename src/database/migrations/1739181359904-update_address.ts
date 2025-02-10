import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAddress1739181359904 implements MigrationInterface {
  name = 'UpdateAddress1739181359904';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "provider" TO "province"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" RENAME COLUMN "province" TO "provider"`,
    );
  }
}
