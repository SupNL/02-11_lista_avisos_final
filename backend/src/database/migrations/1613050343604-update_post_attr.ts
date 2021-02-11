import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class updatePostAttr1613050343604 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("post",
            new TableColumn({
                name : "type",
                type : "enum",
                enum : ["suggestion", "criticism", "compliment"],
                isNullable : false
            })
        );
        await queryRunner.addColumn("post",
            new TableColumn({
                name : "date",
                type : "timestamp",
                default : "CURRENT_TIMESTAMP"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("post", "date");
        await queryRunner.dropColumn("post", "type");
    }

}
