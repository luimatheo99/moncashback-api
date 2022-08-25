import { prisma } from "../../../../database/prismaClient";
import { sendNotification } from "../../../../utils/sendNotification";

interface IRequest {
  id_user: string;
  id_partner: string;
  type: string;
  earned_value: string;
  pay_value: string;
  amount: string;
  external_id: string;
  movimentationsItems: [
    {
        cashback_id: string;
        earned_value: string;
        pay_value: string;
        item_value: string;
    }
  ];
}
interface IResponse {
  success: boolean;
  message?: string;
}

export class CreateTransactionUseCase {
  
  async execute({ 
    id_user,
    id_partner,
    amount,
    type,
    earned_value,
    pay_value,
    external_id,
    movimentationsItems 
  }: IRequest): Promise<IResponse> {
    const partner = await prisma.partners.findFirst({ where: { id: id_partner } })

    if (partner) {
      const transaction = await prisma.transactions.create({
        data: {
          id_company: partner.id_company,
          id_user,
          type,
          earned_value: Number(earned_value),
          pay_value: Number(pay_value),
          amount: Number(amount),
          external_id,
          situation: 'F'
        },
      });

      if (movimentationsItems) {
        for (let index = 0; index < movimentationsItems.length; index++) {
          const movimentationItem = movimentationsItems[index];
  
          await prisma.transactionsItems.create({
            data: {
              id_cashback: movimentationItem.cashback_id ? movimentationItem.cashback_id : null,
              earned_value: Number(movimentationItem.earned_value),
              item_value: Number(movimentationItem.item_value),
              id_transaction: transaction.id,
              pay_value: Number(movimentationItem.pay_value),
            },
          });
        }
      }
  
      const user = await prisma.users.findFirst({ where: { id: id_user } });
  
      if (user) {
        let balance;
        if (type === 'W') {
          balance = Number(user.balance) + Number(earned_value);
        }
  
        if (type === 'P') {
          balance = Number(user.balance) - Number(pay_value);
        }
  
        await prisma.users.update({where: {
          id: id_user
        }, 
        data: {
          balance
        }
        })
  
        const company = await prisma.companies.findFirst({ where: { id: partner.id_company } });
  
        if (company && user.device_id) {
          sendNotification(
            company.name,
            user.device_id,
            type,
            Number(earned_value),
            Number(pay_value),
            balance,
            'F'
          )
        }
      }
    }

    return { success: true };
  }
}
