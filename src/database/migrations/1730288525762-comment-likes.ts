import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CommentLikes1730288525762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comment_likes",
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
                    name: "comment_id",
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
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["comment_id"],
                    referencedTableName: "comments",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("comment_likes");
    }
}
