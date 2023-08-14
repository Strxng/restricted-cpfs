import { IComposition } from "../domain/interfaces/composition.interface";
import { IRouter } from "../domain/interfaces/router.interface";
import { RemoveRestrictedCpf } from "../domain/usecases/removeRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfRemoveRouter } from "../presentation/routers/cpf/cpf.remove.router";
import { CpfValidator } from "../utils/cpf.validator";

export class CpfRemoveComposititon implements IComposition {
	compose (): IRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfRepository = new CpfRepository(repository);
		const cpfValidator = new CpfValidator();

		const removeRestrictedCpf = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });

		return new CpfRemoveRouter(removeRestrictedCpf);
	}
}