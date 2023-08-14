import { ICpfPostRouter } from "../routers/cpf.post.router.interface";

export interface ICpfPostComposition {
  compose: () =>  ICpfPostRouter
}