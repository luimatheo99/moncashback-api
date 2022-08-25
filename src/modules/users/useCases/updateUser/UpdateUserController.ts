import { Request, Response } from "express";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

export class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, genre, code, password, phone } = request.body;

    const updateUserUseCase = new UpdateUserUseCase();
    const result = await updateUserUseCase.execute({
      id, name, email, genre, code, password, phone
    });

    return response.json(result);
  }
}
