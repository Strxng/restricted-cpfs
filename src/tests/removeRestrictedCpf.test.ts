import {describe, expect, it} from "vitest";
import { CpfRepositoryToTest } from "./helpers/cpfRepository";
import { CpfValidatorToTest } from "./helpers/cpfValidator";
import { RemoveRestrictedCpf } from "../domain/usecases/removeRestrictedCpf";
import { NotFoundCpfException } from "../presentation/errors/NotFoundCpfException";
import { InvalidCpfException } from "../presentation/errors/InvalidCpfException";

describe("Tests for removeRestrictedCpf usecase", () => {
	it("should returns null when the remove works well", async () => {
		const cpfString = "123";

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
			removeFn: async () => {},
			saveFn: async (cpf) => cpf,
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const sut = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await sut.execute(cpfString);

		if(response.isRight()){
			expect(response.value).toBeNull();
		}
	});

	it("should returns an NotFounException when findOne returns null", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const sut = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await sut.execute("123");

		expect(response.value).toBeInstanceOf(NotFoundCpfException);
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

		const sut = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await sut.execute("123");

		expect(response.value).toBeInstanceOf(InvalidCpfException);
	});

	it("should returns isRight when usecase works well", async () => {
		const cpfString = "123";

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
			removeFn: async () => {},
			saveFn: async (cpf) => cpf,
		});

		const cpfValidator = new CpfValidatorToTest({
			validateFn: () => true
		});

		const sut = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await sut.execute(cpfString);

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

		const sut = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		const response = await sut.execute(cpfString);

		expect(response.isLeft()).toBe(true);
	});
});