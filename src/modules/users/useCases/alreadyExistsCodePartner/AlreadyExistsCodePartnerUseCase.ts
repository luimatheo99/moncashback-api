import { prisma } from '../../../../database/prismaClient';

export class AlreadyExistsCodePartnerUseCase {
    async execute(code: string) {
      const user = await prisma.users.findFirst({
        where: { code },
      });

      if (user) {
        return { success: true, user };
      }

      return { success: false, message: 'Código não existe!' };
    }
}