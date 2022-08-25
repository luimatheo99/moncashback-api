import { Request, Response } from "express";
import { GetCashbacksUseCase } from "./GetCashbacksUseCase";

export class GetCashbacksController {
  async handle(request: Request, response: Response) {
    const { id_company } = request.params;

    const getCashbacksUseCase = new GetCashbacksUseCase();
    const result = await getCashbacksUseCase.execute(id_company);

    return response.json(result);
  }
}
