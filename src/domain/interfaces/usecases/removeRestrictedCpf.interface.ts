import { InvalidCpfException } from "../../../presentation/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../../presentation/errors/NotFoundCpfException";
import { ServerException } from "../../../presentation/errors/ServerException";
import { Either } from "../../../presentation/errors/either";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface IRemoveRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<ServerException | InvalidCpfException | NotFoundCpfException, null>>
}

export interface IRemoveRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}