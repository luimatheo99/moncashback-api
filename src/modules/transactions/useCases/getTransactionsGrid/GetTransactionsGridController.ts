import { Request, Response } from "express";
import { GetTransactionsGridUseCase } from "./GetTransactionsGridUseCase";

export class GetTransactionsGridController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;
    const { 
      start_date,
      end_date,
      type,
      situation,
      page = 1,
      per_page = 10
    } = request.query;

    const getTransactionsGridUseCase = new GetTransactionsGridUseCase();
    const result = await getTransactionsGridUseCase.execute({
      id_partner,
      start_date,
      end_date,
      type,
      situation,
      page,
      per_page
    });

    return response.json(result);
  }
}
