import { Router } from "express";
import { CpfSaveComposititon } from "./compositions/cpf.save.composition";
import { CpfFindAllComposititon } from "./compositions/cpf.findall.composition";
import { CpfFindOneComposititon } from "./compositions/cpf.findone.composition";
import { CpfRemoveComposititon } from "./compositions/cpf.remove.compositon";

const router = Router();

router.post("/cpf", (req, res) => new CpfSaveComposititon().compose().route(req, res));

router.get("/cpf", (req, res) => new CpfFindAllComposititon().compose().route(req, res));

router.get("/cpf/:cpf", (req, res) => new CpfFindOneComposititon().compose().route(req, res));

router.delete("/cpf/:cpf", (req, res) => new CpfRemoveComposititon().compose().route(req, res));

export { router };