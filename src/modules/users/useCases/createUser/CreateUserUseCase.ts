import { prisma } from "../../../../database/prismaClient";
import { hash } from "bcrypt";
import { resolve } from 'path';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

interface ICreateUser {
  name: string;
  email: string;
  birth_date: string;
  genre: string;
  password: string;
  phone: string;
}

interface IResponse {
  success: boolean;
  message?: string;
}

export class CreateUserUseCase {
  sendEmailWelcome(name: string, email: string): void {
    const templatePath = resolve(
        __dirname,
        '..',
        '..',
        'views',
        'emails',
        'welcome.hbs'
    );

    const variables = {
        name,
    };

    // this.mailProvider.sendMail(
    //     email,
    //     'Mon Cashback | Seja bem vindo :D',
    //     variables,
    //     templatePath
    // );
  }

  async execute({ name, email, birth_date, genre, password, phone }: ICreateUser): Promise<IResponse> {
    const customerAlreadyExistsByEmail = await prisma.users.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (customerAlreadyExistsByEmail) {
      return { success: false, message: 'E-mail já cadastrado!' };
    }

    const customerAlreadyExistsByPhone = await prisma.users.findFirst({
      where: {
        email: {
          equals: phone,
          mode: "insensitive",
        },
      },
    });

    if (customerAlreadyExistsByPhone) {
      return { success: false, message: 'Telefone já cadastrado!' };
    }

    const date = dayjs(birth_date).local().toDate();
    
    const hashPassword = await hash(password, 10);

    let characters = `${name.toUpperCase()}${date.getFullYear()}`;
    characters = characters.replace(/\s/g, '');
    const charactersLength = characters.length;
    let code = '';

    await Promise.all(
        [0, 1, 2, 3, 4, 5].map(async () => {
            code += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            );
        })
    );

    await prisma.users.create({
      data: {
        name,
        email,
        birth_date: date,
        genre,
        password: hashPassword,
        phone,
        code,
        balance: 0,
      },
    });

    this.sendEmailWelcome(name, email);

    return { success: true };
  }
}
