import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  id_partner: string;
  start_date: Date;
  end_date: Date;
  type: string;
  situation: string;
  page: number;
  per_page: number;
}

export class GetTransactionsGridUseCase {
  async execute({ 
    id_partner,
    start_date,
    end_date,
    type,
    situation,
    page,
    per_page 
  }: IRequest) {
    const partner = await prisma.partners.findFirst({ where: { id: id_partner } })

    const transactions = await prisma.transactions.findMany({
      where: { 
        id_company: partner?.id_company,
        created_at: {
          gte: start_date,
          lte: end_date
        },
        type: type ? type : { not: type },
        situation: situation ? situation : { not: situation },
      },
      skip: (page - 1) * per_page,
      take: Number(per_page),
      include: { user: true },
      orderBy: { created_at: 'desc' } 
    });

    const totalCount = await prisma.transactions.count({
      where: { 
        id_company: partner?.id_company,
        created_at: {
          gte: start_date,
          lte: end_date
        },
        type: type ? type : { not: type },
        situation: situation ? situation : { not: situation },
      },
      skip: (page - 1) * per_page,
      take: Number(per_page),
      orderBy: { created_at: 'desc' } 
    });

    return {
      totalCount,
      transactions 
    }
  }
}
