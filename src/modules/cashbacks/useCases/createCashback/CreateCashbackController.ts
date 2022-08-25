import { Request, Response } from "express";
import { CreateCashbackUseCase } from "./CreateCashbackUseCase";

export class CreateCashbackController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;
    const { name, expires_date, percentage } = request.body;

    const createCashbackUseCase = new CreateCashbackUseCase();
    const result = await createCashbackUseCase.execute({
        name, expires_date, percentage, id_partner
    });

    return response.json(result);
  }
}
