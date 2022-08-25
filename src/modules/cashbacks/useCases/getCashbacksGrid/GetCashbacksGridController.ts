import { Request, Response } from "express";
import { GetCashbacksGridUseCase } from "./GetCashbacksGridUseCase";

export class GetCashbacksGridController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;
    const { page = 1, per_page = 10 } = request.query;

    const getCashbacksGridUseCase = new GetCashbacksGridUseCase();
    const result = await getCashbacksGridUseCase.execute({
      id_partner,
      page,
      per_page
    });

    return response.json(result);
  }
}
