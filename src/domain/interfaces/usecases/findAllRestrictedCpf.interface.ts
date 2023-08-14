import { ServerException } from "../../../presentation/errors/ServerException";
import { Either } from "../../../presentation/errors/either";
import { ICpf } from "../cpf.entity.interface";
import { ICpfRepository } from "../cpf.repository.interface";

export interface IFindAllRestrictedCpf {
  execute: () =>  Promise<Either<ServerException, ICpf[]>>
}

export interface IFindAllRestrictedCpfConstructor {
  cpfRepository: ICpfRepository
}