import { InvalidCpfException } from "../../../presentation/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../../presentation/errors/NotFoundCpfException";
import { Either } from "../../../presentation/errors/either";
import { ICpf } from "../cpf.entity.interface";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface IFindRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<InvalidCpfException | NotFoundCpfException, ICpf>>
}

export interface IFindRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}