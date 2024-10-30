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
                    name: "userId",
                    type: "uuid",
                    isNullable: false,
                },
                {
                    name: "commentId",
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
                    columnNames: ["userId"],
                    referencedTableName: "users",
                    referencedColumnNames: ["id"],
                    onDelete: "CASCADE",
                },
                {
                    columnNames: ["commentId"],
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
