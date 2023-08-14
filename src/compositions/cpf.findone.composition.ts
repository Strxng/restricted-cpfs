import { IComposition } from "../domain/interfaces/composition.interface";
import { IRouter } from "../domain/interfaces/router.interface";
import { FindOneRestrictedCpf } from "../domain/usecases/findOneRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfFindOneRouter } from "../presentation/routers/cpf/cpf.findone.router";
import { CpfValidator } from "../utils/cpf.validator";

export class CpfFindOneComposititon implements IComposition {
	compose (): IRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfValidator = new CpfValidator();
		const cpfRepository = new CpfRepository(repository);

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfValidator, cpfRepository });

		return new CpfFindOneRouter(findOneRestrictedCpf);
	}
}