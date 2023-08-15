import { ExistsCpfException } from "../../../utils/errors/ExistsCpfException";
import { InvalidCpfException } from "../../../utils/errors/InvalidCpfException";
import { ServerException } from "../../../utils/errors/ServerException";
import { Either } from "../../../utils/errors/either";
import { ICpf } from "../cpf.entity.interface";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface ISaveRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<ServerException | InvalidCpfException | ExistsCpfException, ICpf>>
}

export interface ISaveRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}