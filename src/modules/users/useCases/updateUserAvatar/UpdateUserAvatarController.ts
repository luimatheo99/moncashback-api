import { Request, Response } from "express";
import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

export class UpdateUserAvatarController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const avatar_file = request.file?.filename;

    const updateUserAvatarUseCase = new UpdateUserAvatarUseCase();
    const result = await updateUserAvatarUseCase.execute({
      id, avatar_file: avatar_file?.toString()
    });

    return response.json(result);
  }
}
