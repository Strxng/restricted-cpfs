import { Request, Response } from "express";
import { ICpfPostRouter, ICpfPostRouterConstructor } from "../../../domain/routers/cpf.post.router.interface";
import { SaveRestrictedCpf } from "../../../domain/usecases/saveRestrictedCpf";

export class CpfPostRouter implements ICpfPostRouter {
	private readonly saveRestrictedCpf: SaveRestrictedCpf;

	constructor({saveRestrictedCpf}: ICpfPostRouterConstructor){
		this.saveRestrictedCpf = saveRestrictedCpf;
	}

	async route (req: Request, res: Response): Promise<void> {
		// validar se a request ta certa

		const response = await this.saveRestrictedCpf.execute(req.body.cpf);

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