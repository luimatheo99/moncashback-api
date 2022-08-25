import { prisma } from '../../../../database/prismaClient';

export class GetPartnerMeUseCase {
    async execute(id_partner: string) {
        const partner = await prisma.partners.findFirst({
            where: { id: id_partner },
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