import { Request, Response } from "express";
import { UpdateUserDeviceUseCase } from "./UpdateUserDeviceUseCase";

export class UpdateUserDeviceController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;
    const { device_id } = request.body;

    const updateUserDeviceUseCase = new UpdateUserDeviceUseCase();
    const result = await updateUserDeviceUseCase.execute({
      id, device_id
    });

    return response.json(result);
  }
}
