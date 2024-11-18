export const DOMAIN_API_URL =
    'https://etf-exchange-ton-fund-back-production.up.railway.app';

export const API = {
    getWalletInfo: (id?: number) =>
        `${DOMAIN_API_URL}/wallet/balance?telegram_id=${id}`,
    appopened: `${DOMAIN_API_URL}/appopened`,
    getFunds: `${DOMAIN_API_URL}/funds`,
    depositAsserts: `${DOMAIN_API_URL}/assets`,
    depositDetails: (id?: number) =>
        `${DOMAIN_API_URL}/deposit?telegram_id=${id}`,
    getTask: (id: number | undefined) =>
        `${DOMAIN_API_URL}/tasks?telegram_id=${id}`,
    checkTask: `${DOMAIN_API_URL}/tasks/complete`,
    withdraw: `${DOMAIN_API_URL}/withdraw`,
    transactions: (id?: number) =>
        `${DOMAIN_API_URL}/wallet/transactions?telegram_id=${id}`,
};
