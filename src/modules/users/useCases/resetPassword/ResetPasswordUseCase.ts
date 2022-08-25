import { hash } from 'bcrypt';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

interface IRequest {
  code: string;
  password: string;
}

export class ResetPasswordUseCase {
    async execute({ code, password }: IRequest): Promise<void> {
      const userCode = await prisma.userCodes.findFirst({
        where: { code },
      });

      if (!userCode) {
        throw new AppError('Code invalid!');
      }

      if (dayjs(userCode.expires_date).isBefore(dayjs().toDate())) {
        throw new AppError('Token expired!');
      }

      const user = await prisma.users.findFirst({
        where: { id: userCode.id_user },
      });

      const hashPassword = await hash(password, 10);
      
      await prisma.users.update({
        where: {
          id: user?.id,
        },
        data: {
          password: hashPassword
        },
      });

      await prisma.userCodes.delete({
        where: {
          id: userCode.id
        }
      })
    }
}