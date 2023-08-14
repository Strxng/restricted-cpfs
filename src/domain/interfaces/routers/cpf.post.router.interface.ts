import { Request, Response } from "express";
import { SaveRestrictedCpf } from "../usecases/saveRestrictedCpf";

export interface ICpfPostRouter {
  route: (req: Request, res: Response) => Promise<void>
}

export interface ICpfPostRouterConstructor {
  saveRestrictedCpf: SaveRestrictedCpf
}