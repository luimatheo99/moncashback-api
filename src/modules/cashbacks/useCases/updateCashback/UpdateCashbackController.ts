import { Request, Response } from "express";
import { UpdateCashbackUseCase } from "./UpdateCashbackUseCase";

export class UpdateCashbackController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { id_company, name, expires_date, percentage } = request.body;

    const updateCashbackUseCase = new UpdateCashbackUseCase();
    const result = await updateCashbackUseCase.execute({
        id, id_company, name, expires_date, percentage
    });

    return response.json(result);
  }
}
