import { prisma } from '../../../../database/prismaClient';

interface IRequest {
    id: string;
    id_partner: string;
    name: string;
    email: string;
    phone: string;
    facebook_url: string;
    instagram_url: string;
    site_url: string;
    logo: string;
    id_category: string;
    id_state: string;
    id_city: string;
    district: string;
    street: string;
    number: number;
    maximum_redeption_limit_perc: number;
}

export class UpdateCompanyUseCase {
    async execute({
        id,
        id_partner,
        name,
        email,
        phone,
        facebook_url,
        instagram_url,
        site_url,
        logo,
        id_category,
        id_state,
        id_city,
        district,
        street,
        number,
        maximum_redeption_limit_perc,
    }: IRequest) {
        const companySave = await prisma.companies.update({
            where: {
              id,
            },
            data: { 
                name,
                email,
                phone,
                facebook_url,
                instagram_url,
                site_url,
                logo,
                id_category,
                id_state,
                id_city,
                district,
                street,
                number: Number(number),
                maximum_redeption_limit_perc,
            },
        });

        return companySave;
    }
}