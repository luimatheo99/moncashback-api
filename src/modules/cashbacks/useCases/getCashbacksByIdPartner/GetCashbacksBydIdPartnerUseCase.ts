import { prisma } from "../../../../database/prismaClient";

export class GetCashbacksBydIdPartnerUseCase {
  async execute(id_partner: string) {
    const partner = await prisma.partners.findFirst({ where: { id: id_partner } })    

    return prisma.cashbacks.findMany({
      where: { id_company: partner?.id_company },
      orderBy: { expires_date: 'asc' } 
    });
  }
}
