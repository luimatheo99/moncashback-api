import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";
import { IUserResponseDTO } from "../../../users/dtos/IUserResponseDTO";


interface IAuthenticateClient {
  login: string;
  password: string;
}

interface IResponse {
  success: boolean;
  message?: string;
  user?: IUserResponseDTO;
  token?: string;
}

export class AuthenticateUserUseCase {
  async execute({ login, password }: IAuthenticateClient): Promise<IResponse> {
    const alreadyExistsEmail = await prisma.users.findFirst({
      where: {
        email: login,
      },
    });

    const alreadyExistsPhone = await prisma.users.findFirst({
      where: {
        phone: login,
      },
    });

    const user = alreadyExistsPhone || alreadyExistsEmail

    if (!user) {
      return { success: false, message: 'Login inválido!' };
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return { success: false, message: 'Login inválido!' };
    }

    const token = sign({ }, "019acc25a4e242bb55ad489832ada12d", {
      subject: user.id,
      expiresIn: "400d",
    });

    return {
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        birth_date: user.birth_date.toLocaleString('pt-BR'),
        genre: user.genre,
        code: user.code,
        avatar: user?.avatar,
        avatar_url: `${process.env.AWS_BUCKET_URL}/avatar/${user.avatar}`,
        balance: Number(user.balance),
      }
    };
  }
}
