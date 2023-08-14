import { IComposition } from "../domain/interfaces/composition.interface";
import { IRouter } from "../domain/interfaces/router.interface";
import { FindAllRestrictedCpf } from "../domain/usecases/findAllRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfFindAllRouter } from "../presentation/routers/cpf/cpf.findall.router";

export class CpfFindAllComposititon implements IComposition {
	compose (): IRouter {
		const repository = databaseConnection.getRepository(CpfEntity);

		const cpfRepository = new CpfRepository(repository);

		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });

		return new CpfFindAllRouter(findAllRestrictedCpf);
	}
}