import { IComposition } from "../domain/interfaces/composition.interface";
import { IRouter } from "../domain/interfaces/router.interface";
import { SaveRestrictedCpf } from "../domain/usecases/saveRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfSaveRouter } from "../presentation/routers/cpf/cpf.save.router";
import { CpfValidator } from "../presentation/utils/cpf.validator";

export class CpfSaveComposititon implements IComposition {
	compose (): IRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfValidator = new CpfValidator();
		const cpfRepository = new CpfRepository(repository);

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfValidator, cpfRepository });

		return new CpfSaveRouter(saveRestrictedCpf);
	}
}