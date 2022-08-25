import { prisma } from '../../../../database/prismaClient';

interface IRequest {
    id: string;
    code: string;
}

interface IResponse {
    success: boolean;
    message?: string;
}

export class AlreadyExistsCodeUserUseCase {
    async execute({ id, code }: IRequest): Promise<IResponse> {
      const user = await prisma.users.findFirst({
        where: { code },
      });

      if (user && user.id !== id) {
        return { success: false, message: 'Código já existe!' };
      }

      return { success: true };
    }
}