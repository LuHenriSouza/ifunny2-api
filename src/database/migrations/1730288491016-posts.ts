import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Posts1730288491016 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "posts",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "user_id", // Adicione a coluna para o relacionamento com o usuário
                    type: "uuid",
                    isNullable: false // Define como não nula, se necessário
                },
                {
                    name: "tags",
                    type: "text", // Use 'text' para armazenar um array de tags
                    isArray: true,
                    isNullable: true,
                },
                {
                    name: "media_url",
                    type: "varchar", // Ajuste o tipo conforme necessário
                    isNullable: false,
                },
                {
                    name: "thumbnail_url",
                    type: "varchar", // Ajuste o tipo conforme necessário
                    isNullable: true,
                },
                {
                    name: "view_count",
                    type: "int",
                    default: 0,
                },
                {
                    name: "comment_count",
                    type: "int",
                    default: 0,
                },
                {
                    name: "like_count",
                    type: "int",
                    default: 0,
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
                }
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("posts");
    }
}
