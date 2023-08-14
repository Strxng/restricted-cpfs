import { InvalidCpfException } from "../../../presentation/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../../presentation/errors/NotFoundCpfException";
import { ServerException } from "../../../presentation/errors/ServerException";
import { Either } from "../../../presentation/errors/either";
import { ICpf } from "../cpf.entity.interface";
import { ICpfRepository } from "../cpf.repository.interface";
import { ICpfValidator } from "../cpf.validator.interface";

export interface IFindOneRestrictedCpf {
  execute: (cpf: string) =>  Promise<Either<ServerException | InvalidCpfException | NotFoundCpfException, ICpf>>
}

export interface IFindRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
  cpfValidator: ICpfValidator
}