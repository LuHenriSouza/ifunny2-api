import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Likes1730288508894 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "likes",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "user_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "post_id",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                }
            ],
            foreignKeys: [
                {
                    columnNames: ["user_id"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE", // Adapte conforme necessário
                },
                {
                    columnNames: ["post_id"],
                    referencedTableName: "posts",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE", // Adapte conforme necessário
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("likes");
    }
}
