import { Expo } from 'expo-server-sdk';

export const sendNotification = async (
    name_company: string,
    device_id: string,
    type: string,
    earned_value: number,
    pay_value: number,
    balance?: number,
    situation?: string
): Promise<void> => {
    const expo = new Expo();

    let message;
    message = {};

    const earned_value_formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(earned_value);

    const pay_value_formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(pay_value);

    const balance_formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(balance ?? 0);

    let body;

    body = '';
    if (situation === 'F') {
        body =
            type === 'W'
                ? `Você ganhou ${earned_value_formatted} em Cashback!`
                : `Você pagou ${pay_value_formatted} em Cashback!`;
    } else if (situation === 'C') {
        body = 'Transação cancelada!';
    }
    body += `\nSeu saldo atual é de ${balance_formatted}. 🤑`;

    message = {
        to: device_id,
        sound: 'default',
        title: name_company,
        body,
    };

    const chunk = expo.chunkPushNotifications([message]);

    const ticket = await expo.sendPushNotificationsAsync(chunk[0]);
};
