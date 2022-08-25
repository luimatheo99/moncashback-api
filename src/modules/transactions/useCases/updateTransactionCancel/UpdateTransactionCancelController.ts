import { Request, Response } from "express";
import { UpdateTransactionCancelUseCase } from "./UpdateTransactionCancelUseCase";

export class UpdateTransactionCancelController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
   
    const updateTransactionCancelUseCase = new UpdateTransactionCancelUseCase();
    const result = await updateTransactionCancelUseCase.execute(id);

    return response.json(result);
  }
}
