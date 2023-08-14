import { ICpf } from "./cpf.entity.interface";

export interface ICpfRepository {
  save: (cpf: ICpf) => Promise<ICpf>
  remove: (cpf: string) => Promise<void>
  findOne: (cpf: string) => Promise<ICpf | null>
  findAll: () => Promise<ICpf[]>
}