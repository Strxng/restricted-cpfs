import { Request, Response } from "express";

export interface IRouter {
  route: (req: Request, res: Response) => Promise<void>
}