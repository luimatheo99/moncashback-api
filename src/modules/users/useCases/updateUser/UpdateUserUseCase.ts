import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface IUpdateUser {
  id: string;
  name: string;
  email: string;
  genre: string;
  code: string;
  password: string;
  phone: string;
}

export class UpdateUserUseCase {
  async execute({ id, name, email, genre, code, password, phone }: IUpdateUser) {
    const user = await prisma.users.findUnique({
      where: {
        id
      },
    });

    if (!user) {
      throw new Error("User is not exists");
    }

    let hashPassword;
    if (password) {
      hashPassword = await hash(password, 10);
    }

    await prisma.users.update({
      where: {
        id,
      },
      data: {
        name,
        email,
        birth_date: user.birth_date,
        genre,
        password: password ? hashPassword : user.password,
        phone,
        code,
      },
    });

    return prisma.users.findUnique({
      where: {
        id
      },
    });
  }
}
