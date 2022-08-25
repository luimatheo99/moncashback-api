interface IUserResponseDTO {
    id: string;
    email: string;
    name: string;
    avatar: string | null;
    birth_date: string;
    code: string;
    phone: string;
    genre: string;
    avatar_url?: string | null;
    balance: number;
}

export { IUserResponseDTO };
