import { Request, Response } from "express";

import { SendForgotPasswordUseCase } from "./SendForgotPasswordUseCase";

export class SendForgotPasswordController {
  async handle(request: Request, response: Response) {
    const { phone } = request.body;
    
    const sendForgotPasswordUseCase = new SendForgotPasswordUseCase();
    await sendForgotPasswordUseCase.execute(phone)        

    return response.send();
  }
}
