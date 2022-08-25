import { compare, hash } from "bcrypt";
import { prisma } from '../../../../database/prismaClient';

interface IRequest {
    id: string;
    password: string;
}

interface IResponse {
    success: boolean;
    message?: string;
}

export class AlreadyExistsPasswordUserUseCase {
    async execute({ id, password }: IRequest): Promise<IResponse> {
      const user = await prisma.users.findFirst({
        where: { id },
      });
      
      if (!user) {
        return { success: false, message: 'Erro' };
      }

      const passwordMatch = await compare(password, user.password);
      
      if (!passwordMatch) {
        return { success: false, message: 'Senha atual incorreta!' };
      }

      return { success: true };
    }
}