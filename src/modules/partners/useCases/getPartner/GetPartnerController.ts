import { Request, Response } from "express";
import { GetPartnerUseCase } from "./GetPartnerUseCase";

export class GetPartnerController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getPartnerUseCase = new GetPartnerUseCase();
    const result = await getPartnerUseCase.execute(id)        

    return response.json(result);
  }
}
