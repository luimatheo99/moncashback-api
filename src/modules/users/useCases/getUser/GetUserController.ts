import { Request, Response } from "express";
import { GetUserUseCase } from "./GetUserUseCase";

export class GetUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const getUserUseCase = new GetUserUseCase();
    const result = await getUserUseCase.execute(id)        

    return response.json(result);
  }
}
