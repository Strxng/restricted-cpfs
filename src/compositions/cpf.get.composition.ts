import { IComposition } from "../domain/interfaces/composition.interface";
import { IRouter } from "../domain/interfaces/router.interface";
import { FindRestrictedCpf } from "../domain/usecases/findRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfGetRouter } from "../presentation/routers/cpf/cpf.get.router";
import { CpfValidator } from "../presentation/utils/cpf.validator";

export class CpfGetComposititon implements IComposition {
	compose (): IRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfValidator = new CpfValidator();
		const cpfRepository = new CpfRepository(repository);

		const findRestrictedCpf = new FindRestrictedCpf({ cpfValidator, cpfRepository });

		return new CpfGetRouter(findRestrictedCpf);
	}
}