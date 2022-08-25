import { prisma } from '../../../database/prismaClient';

export class GetCitiesByStateUseCase {
    async execute(id_state: string) {
      return prisma.cities.findMany({ where: { id_state } });
    }
}