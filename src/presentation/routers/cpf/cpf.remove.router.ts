import { Request, Response } from "express";
import { IRouter } from "../../../domain/interfaces/router.interface";
import { CpfDto } from "../../../infrastructure/dtos/cpf.dto";
import { validate } from "class-validator";
import { IRemoveRestrictedCpf } from "../../../domain/interfaces/usecases/removeRestrictedCpf.interface";

export class CpfRemoveRouter implements IRouter {
	private readonly removeRestrictedCpf: IRemoveRestrictedCpf;

	constructor(removeRestrictedCpf: IRemoveRestrictedCpf){
		this.removeRestrictedCpf = removeRestrictedCpf;
	}

	async route (req: Request, res: Response): Promise<void> {
		const cpfDto = new CpfDto();
		const cpf = req.params.cpf as string;

		cpfDto.cpf = cpf.replaceAll(".", "").replaceAll("-", "");

		const errors = await validate(cpfDto);

		if (errors.length) {
			const errMessage = Object.values(errors[0].constraints!)[0];
			res.status(400).json({
				type: "BadRequestException",
				message: errMessage
			});
		}

		if(!cpfDto.cpf){
			res.status(400).json({
				type: "BadRequestException",
				message: "CPF is required"
			});
		}

		const response = await this.removeRestrictedCpf.execute(cpfDto.cpf);

		if(response.isLeft()){
			res.status(response.value.statusCode).json({
				type: response.value.type,
				message: response.value.message
			});
		} else {
			res.status(204).json(response.value);
		}
	}
}