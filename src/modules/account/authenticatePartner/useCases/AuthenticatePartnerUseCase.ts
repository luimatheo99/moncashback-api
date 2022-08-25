import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";

import { prisma } from "../../../../database/prismaClient";

interface IAuthenticateClient {
  email: string;
  password: string;
}

interface IResponse {
  success: boolean;
  message?: string;
  partner?: {
    id: string;
    name: string;
    email: string;
    id_company: string;
  };
  token?: string;
}

export class AuthenticatePartnerUseCase {
  async execute({ email, password }: IAuthenticateClient): Promise<IResponse> {
    const partner = await prisma.partners.findFirst({
      where: { email },
    });

    if (!partner) {
      return { success: false, message: 'Login inválido!' };
    }

    const passwordMatch = await compare(password, partner.password);

    if (!passwordMatch) {
      throw new Error("Email or password invalid!");
    }

    const token = sign({ }, "55681f25f2b5ce8a670140d1dff04da5", {
      subject: partner.id,
      expiresIn: "400d",
    });

    const company = await prisma.companies.findFirst({ where: { id: partner.id_company } })

    return {
      success: true,
      token,
      partner: {
        id: partner.id,
        name: partner.name,
        email: partner.email,
        id_company: partner.id_company,
      }
    };
  }
}
