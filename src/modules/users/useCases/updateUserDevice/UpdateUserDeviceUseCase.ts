import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface IUpdateUserDevice {
  id: string;
  device_id: string;
}

export class UpdateUserDeviceUseCase {
  async execute({ id, device_id }: IUpdateUserDevice) {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
    });

    if (!user) {
      throw new Error("User is not exists");
    }

    await prisma.users.update({
      where: {
        id,
      },
      data: {
        device_id
      },
    });
  }
}
