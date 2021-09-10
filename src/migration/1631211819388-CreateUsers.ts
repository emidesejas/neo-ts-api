import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUsers1631211819388 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: "user",
      columns: [
        {
          name: "id",
          type: "int",
          isPrimary: true,
          isGenerated: true
        },
        {
          name: "firstName",
          type: "varchar",
          isNullable: false
        },
        {
          name: "lastName",
          type: "varchar"
        },
        {
          name: "email",
          type: "varchar",
          isNullable: false
        },
        {
          name: "password",
          type: "varchar",
          isNullable: false
        }
      ]
    }), true)

    await queryRunner.createIndex("user", new TableIndex({
      name: "IDX_USER_EMAIL",
      columnNames: ["email"]
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user");
  }
}
