import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Comments1730288515247 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
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
                    name: "content",
                    type: "text", // Pode usar 'text' para suportar longas descrições
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
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["post_id"],
                    referencedTableName: "posts",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comments");
    }
}
