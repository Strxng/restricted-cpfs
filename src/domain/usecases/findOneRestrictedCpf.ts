import { Either, left, right } from "../../utils/errors/either";
import { InvalidCpfException } from "../../utils/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../utils/errors/NotFoundCpfException";
import { ServerException } from "../../utils/errors/ServerException";
import { ICpf } from "../interfaces/cpf.entity.interface";
import { ICpfRepository } from "../interfaces/cpf.repository.interface";
import { ICpfValidator } from "../interfaces/cpf.validator.interface";
import { IFindOneRestrictedCpf, IFindRestrictedCpfConstructor } from "../interfaces/usecases/findRestrictedCpf.interface";

export class FindOneRestrictedCpf implements IFindOneRestrictedCpf {
	private readonly cpfRepository: ICpfRepository;
	private readonly cpfValidator: ICpfValidator;

	constructor({cpfRepository, cpfValidator}: IFindRestrictedCpfConstructor){
		this.cpfRepository = cpfRepository;
		this.cpfValidator = cpfValidator;
	}

	async execute (cpf: string): Promise<Either<ServerException | InvalidCpfException | NotFoundCpfException, ICpf>> {
		try {
			const isValidCpf = this.cpfValidator.validate(cpf);
			if(!isValidCpf){
				return left(new InvalidCpfException());
			}

			const findedCpf = await this.cpfRepository.findOne(cpf);
			if(!findedCpf){
				return left(new NotFoundCpfException());
			}

			return right(findedCpf);
		} catch (e) {
			return left(new ServerException());
		}
	}
}