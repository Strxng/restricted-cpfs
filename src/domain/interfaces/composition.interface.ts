import { IRouter } from "./router.interface";

export interface IComposition {
  compose: () =>  IRouter
}