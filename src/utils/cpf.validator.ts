import { ICpfValidator } from "../domain/interfaces/cpf.validator.interface";
import {isCPF} from "brazilian-values";

export class CpfValidator implements ICpfValidator {
	validate (cpf: string): boolean {
		return isCPF(cpf);
	}
}