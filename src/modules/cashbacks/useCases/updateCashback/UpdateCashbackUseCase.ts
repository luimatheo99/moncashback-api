import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { resolve } from 'path';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface IUpdateCashback {
  id: string;
  id_company: string;
  name: string;
  expires_date: string;
  percentage: string;
}

interface IResponse {
  success: boolean;
  message?: string;
}

export class UpdateCashbackUseCase {
  async execute({ id, id_company, name, expires_date, percentage }: IUpdateCashback): Promise<IResponse> {
    await prisma.cashbacks.update({
      where: {
        id,
      },
      data: {
        id_company, name, expires_date: new Date(expires_date), percentage,
      },
    });

    return { success: true };
  }
}
