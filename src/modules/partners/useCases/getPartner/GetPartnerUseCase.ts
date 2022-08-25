import { prisma } from '../../../../database/prismaClient';

export class GetPartnerUseCase {
    async execute(id: string) {
        const partner = await prisma.partners.findFirst({
            where: { id },
        });

        if (!partner) {
            return {
                success: false,
                message: 'Parceiro não existe!',
            };
        } 
        return {
            success: true,
            partner
        };
    }
}