import { Request, Response } from "express";
import { GetCompaniesUseCase } from "./GetCompaniesUseCase";

export class GetCompaniesController {
  async handle(request: Request, response: Response) {
    const getCompaniesUseCase = new GetCompaniesUseCase();
    const result = await getCompaniesUseCase.execute()        

    return response.json(result);
  }
}
