import { Request, Response } from "express";
import { GetStatesUseCase } from "./GetStatesUseCase";

export class GetStatesController {
  async handle(request: Request, response: Response) {
    const getStatesUseCase = new GetStatesUseCase();
    const result = await getStatesUseCase.execute()        

    return response.json(result);
  }
}
