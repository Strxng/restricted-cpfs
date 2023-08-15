import { InvalidCpfException } from "../../../utils/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../../utils/errors/NotFoundCpfException";
import { ServerException } from "../../../utils/errors/ServerException";
import { Either } from "../../../utils/errors/either";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface IRemoveRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<ServerException | InvalidCpfException | NotFoundCpfException, null>>
}

export interface IRemoveRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}