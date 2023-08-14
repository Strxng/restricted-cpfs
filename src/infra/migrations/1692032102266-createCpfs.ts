import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateCpfs1692032102266 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: "cpfs",
				columns: [
					{
						name: "id",
						type: "uuid",
						isPrimary: true,
					},
					{
						name: "cpf",
						type: "varchar",
						isUnique: true,
					},
					{
						name: "created_at",
						type: "timestamp",
						default: "now()",
					},
					{
						name: "deleted_at",
						type: "timestamp",
					},
				],
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		queryRunner.dropTable("cpfs");
	}
}
