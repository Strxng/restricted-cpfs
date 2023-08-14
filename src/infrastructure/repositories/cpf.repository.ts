import { Repository } from "typeorm";
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";
import { ICpfRepository } from "../../domain/interfaces/cpf.repository.interface";
import { CpfEntity } from "../entities/cpf.entity";

export class CpfRepository implements ICpfRepository {
	private readonly repo: Repository<CpfEntity>;

	constructor(repository: Repository<CpfEntity>){
		this.repo = repository;
	}

	async save (cpf: ICpf): Promise<ICpf> {
		const createdCpf = this.repo.create(cpf);
		await this.repo.save(createdCpf);
		delete createdCpf.deletedAt;
		return createdCpf;
	}

	async remove (cpfId: string): Promise<void> {
		await this.repo.softDelete(cpfId);
	}

	async findOne (cpf: string): Promise<ICpf | null> {
		const findedCpf = await this.repo.findOne({
			where: {
				cpf: cpf
			},
			select: {
				cpf: true, 
				createdAt: true
			}
		});

		return findedCpf;
	}

	async findAll (): Promise<ICpf[]> {
		const cpfs = await this.repo.find({
			select: {
				cpf: true,
				createdAt: true,
			}
		});

		return cpfs;
	}
}