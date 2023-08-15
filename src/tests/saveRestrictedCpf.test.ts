import {describe, expect, it} from "vitest";
import { CpfRepositoryToTest } from "./helpers/cpfRepository";
import { ServerException } from "../presentation/errors/ServerException";
import { SaveRestrictedCpf } from "../domain/usecases/saveRestrictedCpf";
import { CpfValidatorToTest } from "./helpers/cpfValidator";
import { InvalidCpfException } from "../presentation/errors/InvalidCpfException";
import { ExistsCpfException } from "../presentation/errors/ExistsCpfException";

describe("Tests for saveRestrictedCpf usecase", () => {
	it("should returns a cpf when the save works well", async () => {
		const cpfString = "123";

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async (cpf) => cpf,
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await saveRestrictedCpf.execute(cpfString);

		expect(response.isRight()).toBe(true);

		if(response.isRight()){
			expect(response.value.cpf).toEqual(cpfString);
		}
	});

	it("should returns an InvalidCpfException when cpfValidator returns false", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => false
		});

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await saveRestrictedCpf.execute("123");

		expect(response.value).toBeInstanceOf(InvalidCpfException);
	});

	it("should returns an ExistsCpfException when repository findOne find an equal cpf", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => {
				throw new ServerException();
			},
			findOneFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await saveRestrictedCpf.execute("123");

		expect(response.value).toBeInstanceOf(ExistsCpfException);
	});

	it("should returns isRight when usecase works well", async () => {
		const cpfString = "123";

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async (cpf) => cpf,
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});


		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await saveRestrictedCpf.execute(cpfString);

		expect(response.isRight()).toBe(true);
	});

	it("should returns isLeft when everything breaks", async () => {
		const cpfString = "123";

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async (cpf) => cpf,
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => false
		});

		const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await saveRestrictedCpf.execute(cpfString);

		expect(response.isLeft()).toBe(true);
	});
});