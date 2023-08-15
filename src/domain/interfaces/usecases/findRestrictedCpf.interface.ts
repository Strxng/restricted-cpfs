import { InvalidCpfException } from "../../../utils/errors/InvalidCpfException";
import { NotFoundCpfException } from "../../../utils/errors/NotFoundCpfException";
import { ServerException } from "../../../utils/errors/ServerException";
import { Either } from "../../../utils/errors/either";
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