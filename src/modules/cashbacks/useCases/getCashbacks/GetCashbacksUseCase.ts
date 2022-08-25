import { prisma } from "../../../../database/prismaClient";

export class GetCashbacksUseCase {
  async execute(id_company: string) {
    return prisma.cashbacks.findMany({
      where: { id_company },
      orderBy: { expires_date: 'asc' } 
    });
  }
}
