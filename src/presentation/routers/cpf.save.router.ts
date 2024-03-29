import { Request, Response } from "express";
import { IRouter } from "../../domain/interfaces/router.interface";
import { ISaveRestrictedCpf } from "../../domain/interfaces/usecases/saveRestrictedCpf.interface";
import { CpfDto } from "../../infrastructure/dtos/cpf.dto";
import { validate } from "class-validator";

export class CpfSaveRouter implements IRouter {
	private readonly saveRestrictedCpf: ISaveRestrictedCpf;

	constructor(saveRestrictedCpf: ISaveRestrictedCpf){
		this.saveRestrictedCpf = saveRestrictedCpf;
	}

	async route (req: Request, res: Response) {
		const cpfDto = new CpfDto();
  	cpfDto.cpf =req.body.cpf.replaceAll(".", "").replaceAll("-", "");

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

  	const response = await this.saveRestrictedCpf.execute(cpfDto.cpf);

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