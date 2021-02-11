import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class updatePostApprovation1612963059536 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("post",
            new TableColumn({
                name : "approved",
                type : "bool",
                default : "false"
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("post", "approved");
    }

}
