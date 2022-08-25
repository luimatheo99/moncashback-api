import { Request, Response } from "express";
import { AuthenticatePartnerUseCase } from "./AuthenticatePartnerUseCase";

export class AuthenticatePartnerController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticatePartnerUseCase = new AuthenticatePartnerUseCase();
    const result = await authenticatePartnerUseCase.execute({
      email,
      password,
    });

    return response.json(result);
  }
}
