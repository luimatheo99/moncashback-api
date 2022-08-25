import { prisma } from '../../../../database/prismaClient';
import { IUserResponseDTO } from '../../dtos/IUserResponseDTO';

interface IResponse {
    success: boolean;
    message?: string;
    user?: IUserResponseDTO;
}

export class GetUserUseCase {
    async execute(id: string): Promise<IResponse> {
        const user = await prisma.users.findFirst({
            where: { id },
        });

        if (!user) {
            return {
                success: false,
                message: 'Usuário não existe!',
            };
        }


        let userMapper = user;
        userMapper.birth_date = user?.birth_date.toLocaleString('pt-BR');
        
        return {
            success: true,
            user: userMapper
        };
    }
}