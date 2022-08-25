import { prisma } from '../../../../database/prismaClient';

export class GetCompaniesUseCase {
    async execute() {
        return prisma.companies.findMany({ include: {
            category: true,
            city: true,
            state: true
        }});
    }
}