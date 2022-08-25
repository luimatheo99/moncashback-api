import { prisma } from "../../../../database/prismaClient";

interface IRequest {
  id_partner: string;
  page: number;
  per_page: number;
}

export class GetCashbacksGridUseCase {
  async execute({ id_partner, page, per_page }: IRequest) {
    const partner = await prisma.partners.findFirst({ where: { id: id_partner } })

    const cashbacks = await prisma.cashbacks.findMany({
      where: { id_company: partner?.id_company },
      skip: (page - 1) * per_page,
      take: Number(per_page),
      orderBy: { expires_date: 'asc' } 
    });

    const totalCount = await prisma.cashbacks.count({
      where: { id_company: partner?.id_company },
      skip: (page - 1) * per_page,
      take: Number(per_page),
      orderBy: { expires_date: 'asc' } 
    });


    return {  
      cashbacks,
      totalCount
    }
  }
}
