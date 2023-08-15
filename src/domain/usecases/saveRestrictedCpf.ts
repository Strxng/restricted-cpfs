import { ExistsCpfException } from "../../utils/errors/ExistsCpfException";
import { InvalidCpfException } from "../../utils/errors/InvalidCpfException";
import { ServerException } from "../../utils/errors/ServerException";
import { Either, left, right } from "../../utils/errors/either";
import { ICpf } from "../interfaces/cpf.entity.interface";
import { ICpfRepository } from "../interfaces/cpf.repository.interface";
import { ICpfValidator } from "../interfaces/cpf.validator.interface";
import { ISaveRestrictedCpf, ISaveRestrictedCpfConstructor } from "../interfaces/usecases/saveRestrictedCpf.interface";

export class SaveRestrictedCpf implements ISaveRestrictedCpf {
	private readonly cpfValidator: ICpfValidator;
	private readonly cpfRepository: ICpfRepository;

	constructor({cpfValidator, cpfRepository}: ISaveRestrictedCpfConstructor){
		this.cpfValidator = cpfValidator;
		this.cpfRepository = cpfRepository;
	}

	async execute (cpf: string): Promise<Either<ServerException | InvalidCpfException | ExistsCpfException, ICpf>> {
		try {
			const isValidCpf = this.cpfValidator.validate(cpf);
			console.log(cpf);

			if(!isValidCpf){
				return left(new InvalidCpfException());
			}

			const existingCpf = await this.cpfRepository.findOne(cpf);
			if(existingCpf){
				return left(new ExistsCpfException());
			}

			const createdCpf = await this.cpfRepository.save({
				cpf: cpf
			});

			return right(createdCpf);
		} catch (e) {
			console.log(e);
			return left(new ServerException());
		}
	}
}