import {MigrationInterface, QueryRunner} from "typeorm";

export class updateUserUniqueLogin1612966564669 implements MigrationInterface {
    name = 'updateUserUniqueLogin1612966564669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` ADD UNIQUE INDEX `IDX_a62473490b3e4578fd683235c5` (`login`)");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user` DROP INDEX `IDX_a62473490b3e4578fd683235c5`");
    }

}
