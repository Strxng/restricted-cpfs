import { FindAllRestrictedCpf } from "../domain/usecases/findAllRestrictedCpf";
import { FindOneRestrictedCpf } from "../domain/usecases/findOneRestrictedCpf";
import { RemoveRestrictedCpf } from "../domain/usecases/removeRestrictedCpf";
import { SaveRestrictedCpf } from "../domain/usecases/saveRestrictedCpf";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { CpfFindAllRouter } from "../presentation/routers/cpf.findall.router";
import { CpfFindOneRouter } from "../presentation/routers/cpf.findone.router";
import { CpfRemoveRouter } from "../presentation/routers/cpf.remove.router";
import { CpfSaveRouter } from "../presentation/routers/cpf.save.router";
import { CpfValidator } from "../utils/cpf.validator";

export class CpfComposition {
	findAllCompose () {
		const repository = databaseConnection.getRepository(CpfEntity);
		const cpfRepository = new CpfRepository(repository);
		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		return new CpfFindAllRouter(findAllRestrictedCpf);
	}

	findOneCompose () {
		const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
  	return new CpfFindOneRouter(findOneRestrictedCpf);
	}

	removeCompose () {
		const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const removeRestrictedCpf = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
  	return new CpfRemoveRouter(removeRestrictedCpf);
	}

	saveCompose () {
		const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
  	return new CpfSaveRouter(saveRestrictedCpf);
	}
}