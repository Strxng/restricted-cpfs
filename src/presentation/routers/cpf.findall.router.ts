import { Request, Response } from "express";
import { IRouter } from "../../domain/interfaces/router.interface";
import { IFindAllRestrictedCpf } from "../../domain/interfaces/usecases/findAllRestrictedCpf.interface";

export class CpfFindAllRouter implements IRouter {
	private readonly findAllRestrictedCpf: IFindAllRestrictedCpf;

	constructor(findAllRestrictedCpf: IFindAllRestrictedCpf){
		this.findAllRestrictedCpf = findAllRestrictedCpf;
	}

	async route (req: Request, res: Response) {
		const response = await this.findAllRestrictedCpf.execute();

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