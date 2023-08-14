import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCpfs1692032102266 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "cpfs",
				columns: [
					{
						name: "cpf",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "created_at",
						type: "timestamptz",
						default: "now()",
					},
					{
						name: "deleted_at",
						type: "timestamptz",
						isNullable: true,
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("cpfs");
	}
}
