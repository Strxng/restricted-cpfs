import { ICpfPostComposition } from "../domain/interfaces/compositions/cpf.post.composition.interface";
import { ICpfPostRouter } from "../domain/interfaces/routers/cpf.post.router.interface";
import { SaveRestrictedCpf } from "../domain/usecases/saveRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfPostRouter } from "../presentation/routers/cpf/cpf.post.router";
import { CpfValidator } from "../presentation/utils/cpf.validator";

export class CpfPostComposititon implements ICpfPostComposition {
	compose (): ICpfPostRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfValidator = new CpfValidator();
		const cpfRepository = new CpfRepository(repository);

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfValidator, cpfRepository });

		return new CpfPostRouter({ saveRestrictedCpf });
	}
}