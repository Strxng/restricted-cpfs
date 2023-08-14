/* eslint-disable no-mixed-spaces-and-tabs */
import { IsString } from "class-validator";
import { ICpf } from "../../domain/interfaces/cpf.entity.interface";

export class CpfDto implements Pick<ICpf, "cpf"> {
  @IsString({message: "CPF must be a string"})
  	cpf!: string;
}