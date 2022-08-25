import { Request, Response } from "express";
import { AlreadyExistsCodeUserUseCase } from "./AlreadyExistsCodeUserUseCase";

export class AlreadyExistsCodeUserController {
  async handle(request: Request, response: Response) {
    const { id_user } = request;
    const { code } = request.params;

    const alreadyExistsCodeUserUseCase = new AlreadyExistsCodeUserUseCase();
    const result = await alreadyExistsCodeUserUseCase.execute({id: id_user, code});

    return response.json(result);
  }
}
