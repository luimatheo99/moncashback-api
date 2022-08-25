import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, birth_date, genre, password, phone } = request.body;

    const createUserUseCase = new CreateUserUseCase();
    const result = await createUserUseCase.execute({
      name,
      email,
      birth_date,
      genre,
      password,
      phone,
    });

    return response.json(result);
  }
}
