import { Request, Response } from "express";
import { GetCitiesByStateUseCase } from "./GetCitiesByStateUseCase";

export class GetCitiesByStateController {
  async handle(request: Request, response: Response) {
    const { id_state } = request.params;
    
    const getCitiesByStateUseCase = new GetCitiesByStateUseCase();
    const result = await getCitiesByStateUseCase.execute(id_state)        

    return response.json(result);
  }
}
