import { Request, Response } from "express";
import { DeleteCashbackUseCase } from "./DeleteCashbackUseCase";

export class DeleteCashbackController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteCashbackUseCase = new DeleteCashbackUseCase();
    const result = await deleteCashbackUseCase.execute(id);

    return response.json(result);
  }
}
