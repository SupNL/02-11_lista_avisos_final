import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createPost1612884603630 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
          new Table({
            name: "post",
            columns: [
              {
                name: "id",
                type: "integer",
                unsigned: true,
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
              },
              {
                name: "message",
                type: "varchar",
              },
            ],
          })
        );
      }

      public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("post");
      }

}
