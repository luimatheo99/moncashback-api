import { Request, Response } from "express";
import { AlreadyExistsCodePartnerUseCase } from "./AlreadyExistsCodePartnerUseCase";

export class AlreadyExistsCodePartnerController {
  async handle(request: Request, response: Response) {
    const { code } = request.params;

    const alreadyExistsCodePartnerUseCase = new AlreadyExistsCodePartnerUseCase();
    const result = await alreadyExistsCodePartnerUseCase.execute(code);

    return response.json(result);
  }
}
