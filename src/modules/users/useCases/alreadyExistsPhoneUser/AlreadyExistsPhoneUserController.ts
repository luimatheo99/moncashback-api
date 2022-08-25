import { Request, Response } from "express";
import { AlreadyExistsPhoneUserUseCase } from "./AlreadyExistsPhoneUserUseCase";

export class AlreadyExistsPhoneUserController {
  async handle(request: Request, response: Response) {
    const { id_user } = request;
    const { phone } = request.params;

    const alreadyExistsPhoneUserUseCase = new AlreadyExistsPhoneUserUseCase();
    const result = await alreadyExistsPhoneUserUseCase.execute({id: id_user, phone});

    return response.json(result);
  }
}
