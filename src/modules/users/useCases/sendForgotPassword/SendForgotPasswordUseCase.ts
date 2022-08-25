import Vonage from '@vonage/server-sdk';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

import { prisma } from '../../../../database/prismaClient';
import { AppError } from '../../../../errors/AppError';

const vonage = new Vonage({
  apiKey: "48e45790",
  apiSecret: "HpDne6tnP1lG0NSx"
})

export class SendForgotPasswordUseCase {
    async execute(phone: string): Promise<void> {
      const user = await prisma.users.findFirst({
          where: { phone },
      });

      if (!user) {
        throw new AppError('Customer does not exists!');
      }

      const numbers = '0123456789';
      const numbersLength = numbers.length;
      let code = '';

      await Promise.all(
          [0, 1, 2, 3].map(async () => {
              code += numbers.charAt(
                  Math.floor(Math.random() * numbersLength)
              );
          })
      );

      const expires_date = dayjs().add(3, 'hour').toDate();

      await prisma.userCodes.create({
        data: {
          code,
          id_user: user.id,
          expires_date
        },
      });
      
      const from = "Mon Cashback"
      const to = `55${phone}`
      const text = `MON CASHBACK: Ola, uma solicitacao de recuperacao de senha foi realizada para esse numero.\n\nCodigo de recuperacao: ${code}`

      vonage.message.sendSms(from, to, text, '', '')
    }
}