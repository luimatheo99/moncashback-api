import { Request, Response } from "express";
import { GetCompanyByPartnerUseCase } from "./GetCompanyByPartnerUseCase";

export class GetCompanyByPartnerController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;

    const getCompanyByPartnerUseCase = new GetCompanyByPartnerUseCase();
    const result = await getCompanyByPartnerUseCase.execute(id_partner)        

    return response.json(result);
  }
}
