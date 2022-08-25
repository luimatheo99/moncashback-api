import { Request, Response } from "express";
import { GetCashbacksBydIdPartnerUseCase } from "./GetCashbacksBydIdPartnerUseCase";

export class GetCashbacksByIdPartnerController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;

    const getCashbacksBydIdPartnerUseCase = new GetCashbacksBydIdPartnerUseCase();
    const result = await getCashbacksBydIdPartnerUseCase.execute(id_partner);

    return response.json(result);
  }
}
