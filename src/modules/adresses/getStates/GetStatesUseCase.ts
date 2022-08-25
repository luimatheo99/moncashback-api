import { prisma } from '../../../database/prismaClient';

export class GetStatesUseCase {
    async execute() {
      return prisma.states.findMany();
    }
}