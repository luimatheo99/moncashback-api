import { Request, Response } from "express";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

export class CreateTransactionController {
  async handle(request: Request, response: Response) {
    const { id_partner } = request;
    const { 
      id_user,
      amount,
      type,
      earned_value,
      pay_value,
      external_id,
      movimentationsItems
    } = request.body;

    const createTransactionUseCase = new CreateTransactionUseCase();
    const result = await createTransactionUseCase.execute({
      id_user,
      id_partner,
      amount,
      type,
      earned_value,
      pay_value,
      external_id,
      movimentationsItems
    });

    return response.json(result);
  }
}
