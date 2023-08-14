import { Request, Response } from "express";
import { ICpfPostRouter, ICpfPostRouterConstructor } from "../../../domain/interfaces/routers/cpf.post.router.interface";
import { SaveRestrictedCpf } from "../../../domain/usecases/saveRestrictedCpf";
import { CpfPostDto } from "../../../infrastructure/dtos/cpf.post.dto";
import { validate } from "class-validator";

export class CpfPostRouter implements ICpfPostRouter {
	private readonly saveRestrictedCpf: SaveRestrictedCpf;

	constructor({saveRestrictedCpf}: ICpfPostRouterConstructor){
		this.saveRestrictedCpf = saveRestrictedCpf;
	}

	async route (req: Request, res: Response): Promise<void> {
		const cpfPostDto = new CpfPostDto();
		cpfPostDto.cpf = req.body.cpf.replaceAll(".", "").replaceAll("-", "");

		const errors = await validate(cpfPostDto);

		if (errors.length) {
			const errMessage = Object.values(errors[0].constraints!)[0];
			res.status(400).json({
				type: "BadRequestException",
				message: errMessage
			});
		}

		if(!cpfPostDto.cpf){
			res.status(400).json({
				type: "BadRequestException",
				message: "CPF is required"
			});
		}

		const response = await this.saveRestrictedCpf.execute(cpfPostDto.cpf);

		if(response.isLeft()){
			res.status(response.value.statusCode).json({
				type: response.value.type,
				message: response.value.message
			});
		} else {
			res.send(response.value);
		}
	}
}