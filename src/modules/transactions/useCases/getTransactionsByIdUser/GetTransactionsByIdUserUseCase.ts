import { prisma } from "../../../../database/prismaClient";

export class GetTransactionsByIdUserUseCase {
  async execute(id_user: string) {
    return prisma.transactions.findMany({
      where: { 
        id_user,
        situation: 'F'
      },
      include: { company: { include: { category: true } } },
      orderBy: { created_at: 'desc' } 
    });
  }
}
