import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUser1612884430397 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name : "user",
            columns : [
                {
                    name : "id",
                    type : "integer",
                    unsigned : true,
                    isPrimary : true,
                    isGenerated : true,
                    generationStrategy : "increment"
                },
                {
                    name : "nome",
                    type : "varchar",
                    isNullable : false
                },
                {
                    name : "login",
                    type : "varchar",
                    isNullable : false
                },
                {
                    name : "senha",
                    type : "varchar",
                    isNullable : false
                },
                {
                    name : "nivel",
                    type : "enum",
                    enum : ["comum", "admin"],
                    default : `"comum"` 
                    // necessario estar assim pq ele n da escape nas aspas
                    // caso contrario ele gera um erro no codigo sql
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("user");
    }

}
