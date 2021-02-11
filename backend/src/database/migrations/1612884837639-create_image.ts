import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImage1612884837639 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: "image",
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
                  name: "path",
                  type: "varchar",
                },
                {
                  name: "post_id",
                  type: "integer",
                  unsigned: true,
                },
              ],
              foreignKeys: [
                {
                  name: "post_image_fk",
                  columnNames: ["post_id"],
                  referencedTableName: "post",
                  referencedColumnNames: ["id"],
                  onUpdate: "CASCADE",
                  onDelete: "CASCADE",
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("image");
    }

}
