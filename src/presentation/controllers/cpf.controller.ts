import { Request, Response } from "express";
import { Controller, Get, ParamPath, Delete, Post, Body } from "express-swagger-autoconfigure";
import { CpfComposition } from "../../compositions/cpf.composition";

@Controller("/cpf")
export class CpfController {
  @Get("/")
	public async findAll(req: Request, res: Response){
		new CpfComposition().findAllCompose().route(req, res);
	}

  @ParamPath({ cpf: "O cpf a ser pesquisado" })
  @Get("/{cpf}")
  public async findOne(req: Request, res: Response){
  	new CpfComposition().findOneCompose().route(req, res);
  }

  @ParamPath({ cpf: "O cpf a ser removido" })
  @Delete("/{cpf}")
  public async remove(req: Request, res: Response){
  	new CpfComposition().removeCompose().route(req, res);
  }

  @Body({
  	cpf: "Cpf a ser cadastrado"
  })
  @Post("/")
  public async save(req: Request, res: Response){
  	new CpfComposition().saveCompose().route(req, res);
  }
}