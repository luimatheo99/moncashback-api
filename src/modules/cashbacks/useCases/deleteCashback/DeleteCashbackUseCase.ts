import { prisma } from "../../../../database/prismaClient";

export class DeleteCashbackUseCase {
  async execute(id: string) {
    await prisma.cashbacks.delete({
      where: {
        id,
      }
    });

    return { success: true };
  }
}
