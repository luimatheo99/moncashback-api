import { prisma } from "../../../../database/prismaClient";

export class GetCashbackUseCase {
  async execute(id: string) {
    return prisma.cashbacks.findFirst({
      where: { id }
    });
  }
}
