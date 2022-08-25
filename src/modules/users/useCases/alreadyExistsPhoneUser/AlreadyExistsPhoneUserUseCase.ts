import { prisma } from '../../../../database/prismaClient';

interface IRequest {
    id: string;
    phone: string;
}

interface IResponse {
    success: boolean;
    message?: string;
}

export class AlreadyExistsPhoneUserUseCase {
    async execute({ id, phone }: IRequest): Promise<IResponse> {
      const user = await prisma.users.findFirst({
        where: { phone },
      });

      if (user && user.id !== id) {
        return { success: false, message: 'Telefone já existe!' };
      }

      return { success: true };
    }
}