import { Either, left, right } from "../../utils/errors/either";
import { InvalidCpfException } from "../../utils/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../utils/errors/NotFoundCpfException";
import { ServerException } from "../../utils/errors/ServerException";
import { ICpfRepository } from "../interfaces/cpf.repository.interface";
import { ICpfValidator } from "../interfaces/cpf.validator.interface";
import { IRemoveRestrictedCpf, IRemoveRestrictedCpfConstructor } from "../interfaces/usecases/removeRestrictedCpf.interface";

export class RemoveRestrictedCpf implements IRemoveRestrictedCpf {
	private readonly cpfRepository: ICpfRepository;
	private readonly cpfValidator: ICpfValidator;

	constructor ({cpfRepository, cpfValidator}: IRemoveRestrictedCpfConstructor) {
		this.cpfRepository = cpfRepository;
		this.cpfValidator = cpfValidator;
	}

	async execute (cpf: string): Promise<Either<ServerException | InvalidCpfException | NotFoundCpfException, null>> {
		try {
			const isValidCpf = this.cpfValidator.validate(cpf);
			if(!isValidCpf){
				return left(new InvalidCpfException());
			}

			const existingCpf = await this.cpfRepository.findOne(cpf);

			if(!existingCpf){
				return left(new NotFoundCpfException());
			}

			await this.cpfRepository.remove(cpf);
			return right(null);
		} catch (e) {
			console.log(e);
			return left(new ServerException());
		}
	}
}