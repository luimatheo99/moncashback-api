import { Request, Response } from "express";
import { GetTransactionsByIdUserUseCase } from "./GetTransactionsByIdUserUseCase";

export class GetTransactionsByIdUserController {
  async handle(request: Request, response: Response) {
    const { id_user } = request.params;
   
    const getTransactionsByIdUserUseCase = new GetTransactionsByIdUserUseCase();
    const result = await getTransactionsByIdUserUseCase.execute(id_user);

    return response.json(result);
  }
}
