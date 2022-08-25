import { Request, Response } from "express";
import { AlreadyExistsPasswordUserUseCase } from "./AlreadyExistsPasswordUserUseCase";

export class AlreadyExistsPasswordUserController {
  async handle(request: Request, response: Response) {
    const { id_user } = request;
    const { password } = request.params;

    const alreadyExistsPasswordUserUseCase = new AlreadyExistsPasswordUserUseCase();
    const result = await alreadyExistsPasswordUserUseCase.execute({id: id_user, password});

    return response.json(result);
  }
}
