import { Request, Response } from "express";
import { Controller, Get, ParamPath, Delete, Post, Body } from "express-swagger-autoconfigure";
import { databaseConnection } from "../../infrastructure/database.connection";
import { CpfEntity } from "../../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../../infrastructure/repositories/cpf.repository";
import { FindAllRestrictedCpf } from "../../domain/usecases/findAllRestrictedCpf";
import { FindOneRestrictedCpf } from "../../domain/usecases/findOneRestrictedCpf";
import { CpfValidator } from "../../utils/cpf.validator";
import { RemoveRestrictedCpf } from "../../domain/usecases/removeRestrictedCpf";
import { SaveRestrictedCpf } from "../../domain/usecases/saveRestrictedCpf";
import { CpfFindAllRouter } from "../routers/cpf.findall.router";
import { CpfFindOneRouter } from "../routers/cpf.findone.router";
import { CpfRemoveRouter } from "../routers/cpf.remove.router";
import { CpfSaveRouter } from "../routers/cpf.save.router";

@Controller("/cpf")
export class CpfController {
  @Get("/")
	public async findAll(req: Request, res: Response){
		const repository = databaseConnection.getRepository(CpfEntity);
		const cpfRepository = new CpfRepository(repository);
		const findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		new CpfFindAllRouter(findAllRestrictedCpf).route(req, res);
	}

  @ParamPath({ cpf: "O cpf a ser pesquisado" })
  @Get("/{cpf}")
  public async findOne(req: Request, res: Response){
  	const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
  	new CpfFindOneRouter(findOneRestrictedCpf).route(req, res);
  }

  @ParamPath({ cpf: "O cpf a ser removido" })
  @Delete("/{cpf}")
  public async remove(req: Request, res: Response){
  	const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const removeRestrictedCpf = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
  	new CpfRemoveRouter(removeRestrictedCpf).route(req, res);
  }

  @Body({
  	cpf: "Cpf a ser cadastrado"
  })
  @Post("/")
  public async save(req: Request, res: Response){
  	const repository = databaseConnection.getRepository(CpfEntity);
  	const cpfRepository = new CpfRepository(repository);
  	const cpfValidator = new CpfValidator();
  	const saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });
  	new CpfSaveRouter(saveRestrictedCpf).route(req, res);
  }
}