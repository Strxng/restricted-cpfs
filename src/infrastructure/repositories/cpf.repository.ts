import { Repository } from "typeorm";
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";
import { ICpfRepository } from "../../domain/interfaces/cpf.repository.interface";
import { CpfEntity } from "../entities/cpf.entity";
import { v4 as uuidV4 } from "uuid";

export class CpfRepository implements ICpfRepository {
	private readonly repo: Repository<CpfEntity>;

	constructor(repository: Repository<CpfEntity>){
		this.repo = repository;
	}

	async save (cpf: ICpf): Promise<ICpf> {
		const id = uuidV4();
		cpf.id = id;

		const createdCpf = this.repo.create(cpf);
		await this.repo.save(createdCpf);

		delete createdCpf.deletedAt;
		delete createdCpf.id;

		return createdCpf;
	}

	async remove (cpf: string): Promise<void> {
		const cpfFinded = await this.repo.findOne({ where: { cpf }});
		if(!cpfFinded) return;

		await this.repo.softDelete(cpfFinded.id!);
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