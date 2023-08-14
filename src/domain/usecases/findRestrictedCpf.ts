import { Either, left, right } from "../../presentation/errors/either";
import { InvalidCpfException } from "../../presentation/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../presentation/errors/NotFoundCpfException";
import { ICpf } from "../interfaces/cpf.entity.interface";
import { ICpfRepository } from "../interfaces/cpf.repository.interface";
import { ICpfValidator } from "../interfaces/cpf.validator.interface";
import { IFindRestrictedCpf, IFindRestrictedCpfConstructor } from "../interfaces/usecases/findRestrictedCpf.interface";

export class FindRestrictedCpf implements IFindRestrictedCpf {
	private readonly cpfRepository: ICpfRepository;
	private readonly cpfValidator: ICpfValidator;

	constructor({cpfRepository, cpfValidator}: IFindRestrictedCpfConstructor){
		this.cpfRepository = cpfRepository;
		this.cpfValidator = cpfValidator;
	}

	async execute (cpf: string): Promise<Either<InvalidCpfException | NotFoundCpfException, ICpf>> {
		const isValidCpf = this.cpfValidator.validate(cpf);
		if(!isValidCpf){
			return left(new InvalidCpfException());
		}

		const findedCpf = await this.cpfRepository.findOne(cpf);
		if(!findedCpf){
			return left(new NotFoundCpfException());
		}

		return right(findedCpf);
	}
}