import { ExistsCpfException } from "../../../common/errors/ExistsCpfException";
import { InvalidCpfException } from "../../../common/errors/InvalidCpfException";
import { Either } from "../../../common/errors/either";
import { ICpf } from "../cpf.entity.interface";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface ISaveRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<InvalidCpfException | ExistsCpfException, ICpf>>
}

export interface ISaveRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}