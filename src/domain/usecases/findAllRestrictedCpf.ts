import { Either, left, right } from "../../utils/errors/either";
import { ServerException } from "../../utils/errors/ServerException";
import { ICpf } from "../interfaces/cpf.entity.interface";
import { ICpfRepository } from "../interfaces/cpf.repository.interface";
import { IFindAllRestrictedCpf, IFindAllRestrictedCpfConstructor } from "../interfaces/usecases/findAllRestrictedCpf.interface";

export class FindAllRestrictedCpf implements IFindAllRestrictedCpf {
	private readonly cpfRepository: ICpfRepository;

	constructor({cpfRepository}: IFindAllRestrictedCpfConstructor){
		this.cpfRepository = cpfRepository;
	}

	async execute () : Promise<Either<ServerException, ICpf[]>> {
		try {
			const cpfs = await this.cpfRepository.findAll();
			return right(cpfs);
		} catch (e) {
			return left(new ServerException());
		}
	}
}