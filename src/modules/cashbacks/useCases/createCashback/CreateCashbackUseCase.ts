import { prisma } from "../../../../database/prismaClient";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface ICreateCashback {
  id_partner: string;
  name: string;
  expires_date: string;
  percentage: string;
}

interface IResponse {
  success: boolean;
  message?: string;
}

export class CreateCashbackUseCase {
  async execute({ id_partner, name, expires_date, percentage }: ICreateCashback): Promise<IResponse> {
    const partner = await prisma.partners.findFirst({ where: { id: id_partner } })

    if (partner) {
      await prisma.cashbacks.create({
        data: {
          id_company: partner?.id_company, name, expires_date: new Date(expires_date), percentage,
        },
      });
    }

    return { success: true };
  }
}
