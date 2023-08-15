import {describe, expect, it} from "vitest";
import { ICpf } from "../domain/interfaces/cpf.entity.interface";
import { CpfRepositoryToTest } from "./helpers/cpfRepository";
import { ServerException } from "../presentation/errors/ServerException";
import { FindOneRestrictedCpf } from "../domain/usecases/findOneRestrictedCpf";
import { CpfValidatorToTest } from "./helpers/cpfValidator";
import { NotFoundCpfException } from "../presentation/errors/NotFoundCpfException";
import { InvalidCpfException } from "../presentation/errors/InvalidCpfException";

describe("Tests for findOneRestrictedCpf usecase", () => {
	it("should returns a NotFoundException when not have a cpf equal on database", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.value).toBeInstanceOf(NotFoundCpfException);
	});

	it("should returns a cpf when have cpfs on database", async () => {
		const cpf: ICpf = {
			id: "123",
			cpf: "test_cpf",
			createdAt: new Date()
		};

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => cpf,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.value).toEqual(cpf);
	});

	it("should returns isLeft when everything breaks", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => {throw new ServerException();},
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.isLeft()).toBe(true);
		expect(response.isRight()).toBe(false);
		expect(response.value).toBeInstanceOf(ServerException);
	});

	it("should returns isRight when usecase works well", async () => {
		const cpf: ICpf = {
			id: "123",
			cpf: "test_cpf",
			createdAt: new Date()
		};

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => cpf,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.isLeft()).toBe(false);
		expect(response.isRight()).toBe(true);
		expect(response.value).toEqual(cpf);
	});

	it("should returns a ServerException when cpfValidator breaks", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => {throw new Error();}
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.isLeft()).toBe(true);
		expect(response.isRight()).toBe(false);
		expect(response.value).toBeInstanceOf(ServerException);
	});

	it("should returns a InvalidCpfException when cpfValidator returns false", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => false
		});

		const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await findOneRestrictedCpf.execute("123");

		expect(response.isLeft()).toBe(true);
		expect(response.isRight()).toBe(false);
		expect(response.value).toBeInstanceOf(InvalidCpfException);
	});
});