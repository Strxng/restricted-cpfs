import { ExistsCpfException } from "../../common/errors/ExistsCpfException";
import { InvalidCpfException } from "../../common/errors/InvalidCpfException";
import { Either, left, right } from "../../common/errors/either";
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

	async execute (cpf: string): Promise<Either<InvalidCpfException | ExistsCpfException, ICpf>> {
		const isValidCpf = this.cpfValidator.validate(cpf);
		if(!isValidCpf){
			left(new InvalidCpfException());
		}

		const existingCpf = await this.cpfRepository.findOne(cpf);
		if(existingCpf){
			left(new ExistsCpfException());
		}

		const createdCpf = await this.cpfRepository.save({
			cpf: cpf
		});

		return right(createdCpf);
	}
}