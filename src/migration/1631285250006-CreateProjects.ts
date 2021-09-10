import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class CreateProjects1631285250006 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'project',
      columns: [
        {
          name: 'id',
          type: 'int',
          isPrimary: true,
          isGenerated: true
        },
        {
          name: 'name',
          type: 'varchar',
          isNullable: false,
        },
        {
          name: 'description',
          type: 'varchar',
          isNullable: true
        },
        {
          name: 'ownerId',
          type: 'int',
          isNullable: false
        }
      ]
    }));

    await queryRunner.createForeignKey('project', new TableForeignKey({
      columnNames: ['ownerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'user',
      onDelete: 'CASCADE'
    }));

    await queryRunner.createIndex('project', new TableIndex({
      name: 'IDX_OWNER',
      columnNames: ['ownerId']
    }));
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
