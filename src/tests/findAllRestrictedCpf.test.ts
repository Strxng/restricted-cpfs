import {describe, expect, it} from "vitest";
import { ICpf } from "../domain/interfaces/cpf.entity.interface";
import { FindAllRestrictedCpf } from "../domain/usecases/findAllRestrictedCpf";
import { CpfRepositoryToTest } from "./helpers/cpfRepository";
import { ServerException } from "../presentation/errors/ServerException";

describe("Tests for findAllRestrictedCpf usecase", () => {
	it("should returns an empty array when not have cpfs on database", async () => {
		const cpfs: ICpf[] = [];

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => cpfs,
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		const response = await findAllRestrictedCpf.execute();

		expect(response.value).toEqual(cpfs);
		expect(typeof response.value).toBe(typeof cpfs);
	});

	it("should returns an array of cpfs when have cpfs on database", async () => {
		const cpfs: ICpf[] = [
			{
				id: "123",
				cpf: "test_cpf",
				createdAt: new Date()
			},
			{
				id: "1234",
				cpf: "test_cpf2",
				createdAt: new Date()
			}
		];

		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => cpfs,
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		const response = await findAllRestrictedCpf.execute();

		expect(response.value).toEqual(cpfs);
	});

	it("should returns isLeft when everything breaks", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => {
				throw new ServerException();
			},
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		const response = await findAllRestrictedCpf.execute();

		expect(response.isLeft()).toBe(true);
		expect(response.isRight()).toBe(false);
		expect(response.value).toBeInstanceOf(ServerException);
	});

	it("should returns isRight when usecase works well", async () => {
		const cpfRepository = new CpfRepositoryToTest({
			findAllFn: async () => [],
			findOneFn: async () => null,
			removeFn: async () => {},
			saveFn: async () => ({ id: "123", cpf: "123", createdAt: new Date() }),
		});

		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		const response = await findAllRestrictedCpf.execute();

		expect(response.isLeft()).toBe(false);
		expect(response.isRight()).toBe(true);
		expect(response.value).toEqual([]);
	});
});