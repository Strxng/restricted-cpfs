/* eslint-disable no-mixed-spaces-and-tabs */
import express, { Express } from "express";
import { ExpressInitializer, SwaggerInitializer, SwaggerEndpoint, Title, Version } from "express-swagger-autoconfigure";
import { CpfController } from "./controllers/cpf.controller";

import cors from "cors";

@SwaggerInitializer
@SwaggerEndpoint("/documentation")
@Title("Restricted Cpfs API")
@Version("1.0")
export class App {
  @ExpressInitializer
	private app!: Express;

  constructor () {
  	this.app.use(cors());
  	this.app.use(express.json());

  	this.initializeControllers();
  }

  private initializeControllers () {
  	new CpfController();
  }

  getApp (): Express{
  	return this.app;
  }
}