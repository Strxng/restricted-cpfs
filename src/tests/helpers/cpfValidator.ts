import { ICpfValidator } from "../../domain/interfaces/cpf.validator.interface";

type ValidateFn = (cpf: string) => boolean

interface ICpfValidatorToTestConstructor {
  validateFn: ValidateFn
}

export class CpfValidatorToTest implements ICpfValidator {
	private readonly validateFn: ValidateFn;

	constructor ({validateFn}: ICpfValidatorToTestConstructor) {
		this.validateFn = validateFn;
	}

	validate (cpf: string) {
		return this.validateFn(cpf);
	}
}