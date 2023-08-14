import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";

@Entity({ name: "cpfs" })
export class CpfEntity implements ICpf {
	@PrimaryGeneratedColumn("uuid")
		id?: string;

	@Column()
		cpf: string;

	@CreateDateColumn({ name: "created_at" })
		createdAt?: Date;

	@DeleteDateColumn({name: "deleted_at"})
		deletedAt?: Date;

	constructor({cpf}: ICpf){
		this.cpf = cpf;
	}
}
