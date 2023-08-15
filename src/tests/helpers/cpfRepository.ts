/* eslint-disable @typescript-eslint/no-unused-vars */
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";
import { ICpfRepository } from "../../domain/interfaces/cpf.repository.interface";

type SaveFn = (cpf: ICpf) =>  Promise<ICpf>
type RemoveFn = (cpf: string) =>  Promise<void>
type FindOneFn = (cpf: string) =>  Promise<ICpf | null>
type FindAllFn = () =>  Promise<ICpf[]>

interface ICpfRepositoryToTestConstructor {
	saveFn: SaveFn
	removeFn: RemoveFn
	findOneFn: FindOneFn
	findAllFn: FindAllFn
}

export class CpfRepositoryToTest implements ICpfRepository {
	private readonly saveFn: SaveFn;
	private readonly removeFn: RemoveFn;
	private readonly findOneFn: FindOneFn;
	private readonly findAllFn: FindAllFn;

	constructor({findAllFn, findOneFn, removeFn, saveFn}: ICpfRepositoryToTestConstructor) {
		this.findAllFn = findAllFn;
		this.findOneFn = findOneFn;
		this.removeFn = removeFn;
		this.saveFn = saveFn;
	}

	async save (cpf: ICpf) : Promise<ICpf> {
		return this.saveFn(cpf);
	}

	async remove (cpf: string) : Promise<void> {
		return this.removeFn(cpf);
	}

	async findOne (cpf: string) : Promise<ICpf | null> {
		return this.findOneFn(cpf);
	}

	async findAll () : Promise<ICpf[]> {
		return this.findAllFn();
	}
}