import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateAddress1739179151378 implements MigrationInterface {
  name = 'CreateAddress1739179151378';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "address" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isDeleted" boolean NOT NULL DEFAULT false, "id" SERIAL NOT NULL, "provider" character varying NOT NULL, "district" character varying NOT NULL, "ward" character varying NOT NULL, "street" character varying NOT NULL, "userId" integer, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "role" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "status" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "file" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "session" ADD "isDeleted" boolean NOT NULL DEFAULT false`,
    );
    await queryRunner.query(
      `ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`,
    );
    await queryRunner.query(`ALTER TABLE "session" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "file" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "status" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`ALTER TABLE "role" DROP COLUMN "isDeleted"`);
    await queryRunner.query(`DROP TABLE "address"`);
  }
}
