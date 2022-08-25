import { Request, Response } from "express";
import { GetCashbackUseCase } from "./GetCashbackUseCase";

export class GetCashbackController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getCashbackUseCase = new GetCashbackUseCase();
    const result = await getCashbackUseCase.execute(id);

    return response.json(result);
  }
}
