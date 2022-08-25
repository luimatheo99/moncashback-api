import { Request, Response } from "express";
import { GetPartnerMeUseCase } from "./GetPartnerMeUseCase";

export class GetPartnerMeController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;

    const getPartnerMeUseCase = new GetPartnerMeUseCase();
    const result = await getPartnerMeUseCase.execute(id_partner)        

    return response.json(result);
  }
}
