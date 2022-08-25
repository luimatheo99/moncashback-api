import { prisma } from '../../../../database/prismaClient';

export class GetCompanyByPartnerUseCase {
    async execute(id_partner: string) {
        const partner = await prisma.partners.findFirst({ where: { id: id_partner } })

        return prisma.companies.findFirst({ where: { id: partner?.id_company } });
    }
}