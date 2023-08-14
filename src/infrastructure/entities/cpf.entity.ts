import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn } from "typeorm";
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";

@Entity({ name: "cpfs" })
export class CpfEntity implements ICpf {
	@PrimaryColumn({ type: "uuid" })
		id?: string;

	@Column({ type: "varchar" })
		cpf!: string;

	@CreateDateColumn({ name: "created_at", type: "timestamp" })
		createdAt?: Date;

	@DeleteDateColumn({name: "deleted_at", type: "timestamp" })
		deletedAt?: Date;
}
