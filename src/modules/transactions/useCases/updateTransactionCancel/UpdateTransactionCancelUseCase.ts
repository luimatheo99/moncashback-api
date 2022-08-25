import { prisma } from "../../../../database/prismaClient";
import { sendNotification } from "../../../../utils/sendNotification";

export class UpdateTransactionCancelUseCase {
  async execute(id: string) {
    await prisma.transactions.update({
      where: {
        id,
      },
      data: {
        situation: 'C'
      },
    });

    const transaction = await prisma.transactions.findFirst({ where: { id } })

    if (transaction) {
      const user = await prisma.users.findFirst({ where: { id: transaction.id_user } })

      if (user) {
        let balance;
        if (transaction.type === 'W') {
          balance = Number(user.balance) - Number(transaction.earned_value);
        }

        if (transaction.type === 'P') {
          balance = Number(user.balance) + Number(transaction.pay_value);
        }

        await prisma.users.update({
          where: {
            id: user.id,
          },
          data: {
            balance
          },
        });

        const { type } = transaction;
        const { earned_value } = transaction;
        const { pay_value } = transaction;

        const company = await prisma.companies.findFirst({ where: { id: transaction.id_company } })

        if (company) {
          sendNotification(
            company.name,
            user.device_id,
            type,
            earned_value,
            pay_value,
            balance,
            'C'
          );
        }
      }
    }
  }
}
