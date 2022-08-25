import { Request, Response } from "express";

import { ResetPasswordUseCase } from "./ResetPasswordUseCase";

export class ResetPasswordController {
  async handle(request: Request, response: Response) {
    const { code } = request.query;
    const { password } = request.body;

    const resetPasswordUseCase = new ResetPasswordUseCase();
    await resetPasswordUseCase.execute({
      code: String(code),
      password,
    })        

    return response.send();
  }
}
