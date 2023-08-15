/* eslint-disable no-mixed-spaces-and-tabs */
import { Request, Response } from "express";
import { Controller, Get, ParamPath, Delete, Post, Body } from "express-swagger-autoconfigure";
import { databaseConnection } from "../infrastructure/database.connection";
import { CpfEntity } from "../infrastructure/entities/cpf.entity";
import { CpfRepository } from "../infrastructure/repositories/cpf.repository";
import { FindAllRestrictedCpf } from "../domain/usecases/findAllRestrictedCpf";
import { FindOneRestrictedCpf } from "../domain/usecases/findOneRestrictedCpf";
import { CpfValidator } from "../utils/cpf.validator";
import { CpfDto } from "../infrastructure/dtos/cpf.dto";
import { validate } from "class-validator";
import { RemoveRestrictedCpf } from "../domain/usecases/removeRestrictedCpf";
import { SaveRestrictedCpf } from "../domain/usecases/saveRestrictedCpf";

@Controller("/cpf")
export class CpfController {
	private findAllRestrictedCpf: FindAllRestrictedCpf;
	private findOneRestrictedCpf: FindOneRestrictedCpf;
	private removeRestrictedCpf: RemoveRestrictedCpf;
	private saveRestrictedCpf: SaveRestrictedCpf;
	private cpfDto: CpfDto;

	constructor(){
		const repository = databaseConnection.getRepository(CpfEntity);
		const cpfRepository = new CpfRepository(repository);
		const cpfValidator = new CpfValidator();

		this.findAllRestrictedCpf = new FindAllRestrictedCpf({ cpfRepository });
		this.findOneRestrictedCpf = new FindOneRestrictedCpf({ cpfRepository, cpfValidator });
		this.removeRestrictedCpf = new RemoveRestrictedCpf({ cpfRepository, cpfValidator });
		this.saveRestrictedCpf = new SaveRestrictedCpf({ cpfRepository, cpfValidator });

		this.cpfDto = new CpfDto();
	}

  @Get("/")
	public async findAll(req: Request, res: Response){
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

  @ParamPath({ cpf: "O cpf a ser pesquisado" })
  @Get("/{cpf}")
  public async findOne(req: Request, res: Response){
  	const cpf = req.params.cpf as string;
  	this.cpfDto.cpf = cpf.replaceAll(".", "").replaceAll("-", "");

  	const errors = await validate(this.cpfDto);

  	if (errors.length) {
  		const errMessage = Object.values(errors[0].constraints!)[0];
  		res.status(400).json({
  			type: "BadRequestException",
  			message: errMessage
  		});
  	}

  	if(!this.cpfDto.cpf){
  		res.status(400).json({
  			type: "BadRequestException",
  			message: "CPF is required"
  		});
  	}

  	const response = await this.findOneRestrictedCpf.execute(this.cpfDto.cpf);

  	if(response.isLeft()){
  		res.status(response.value.statusCode).json({
  			type: response.value.type,
  			message: response.value.message
  		});
  	} else {
  		res.send(response.value);
  	}
  }

  @ParamPath({ cpf: "O cpf a ser removido" })
  @Delete("/{cpf}")
  public async remove(req: Request, res: Response){
  	const cpf = req.params.cpf as string;
  	this.cpfDto.cpf = cpf.replaceAll(".", "").replaceAll("-", "");

  	const errors = await validate(this.cpfDto);

  	if (errors.length) {
  		const errMessage = Object.values(errors[0].constraints!)[0];
  		res.status(400).json({
  			type: "BadRequestException",
  			message: errMessage
  		});
  	}

  	if(!this.cpfDto.cpf){
  		res.status(400).json({
  			type: "BadRequestException",
  			message: "CPF is required"
  		});
  	}

  	const response = await this.removeRestrictedCpf.execute(this.cpfDto.cpf);

  	if(response.isLeft()){
  		res.status(response.value.statusCode).json({
  			type: response.value.type,
  			message: response.value.message
  		});
  	} else {
  		res.status(204).json(response.value);
  	}
  }

  @Body({
  	cpf: "Cpf a ser cadastrado"
  })
  @Post("/")
  public async save(req: Request, res: Response){
  	this.cpfDto.cpf = req.body.cpf.replaceAll(".", "").replaceAll("-", "");

  	const errors = await validate(this.cpfDto);

  	if (errors.length) {
  		const errMessage = Object.values(errors[0].constraints!)[0];
  		res.status(400).json({
  			type: "BadRequestException",
  			message: errMessage
  		});
  	}

  	if(!this.cpfDto.cpf){
  		res.status(400).json({
  			type: "BadRequestException",
  			message: "CPF is required"
  		});
  	}

  	const response = await this.saveRestrictedCpf.execute(this.cpfDto.cpf);

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