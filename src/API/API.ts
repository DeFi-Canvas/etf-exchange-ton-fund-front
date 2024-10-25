import { JettonType } from '@/types.ts';

const API_URL = 'https://etf-exchange-ton-fund-back-production.up.railway.app';

export const API = {
    getWalletInfo: async (address: string) => {
        try {
            let res = await fetch(`${API_URL}/walletbalance/${address}`);
            return (await res.json()) as {
                balance: number;
                price: number;
                totalamount: number;
                jettons: Array<JettonType>;
            };
        } catch (e) {
            return;
        }
    },
    getWalletJettons: async (wallet_address: string) => {
        try {
            let res: {
                balances: Balance[];
            } = await fetch(
                `https://testnet.tonapi.io/v2/accounts/${wallet_address}/jettons`
            ).then((res) => res.json());
            return res.balances;
        } catch (e) {
            console.log(e);
            return;
        }
    },
    sendAppOpened: async (userData: {
        id: number | string;
        userName: string;
    }) => {
        try {
            return await fetch(`${API_URL}/appopened`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            }).then(
                (res) =>
                    res.json() as Promise<{
                        user_id: 1;
                        address: Array<string>;
                        created_at: number;
                        updated_at: number;
                    }>
            );
        } catch (e) {
            console.log(e);
        }
    },
};

export interface Balance {
    balance: string;
    wallet_address: WalletAddress;
    jetton: Jetton;
}

export interface WalletAddress {
    address: string;
    is_scam: boolean;
    is_wallet: boolean;
}

export interface Jetton {
    address: string;
    name: string;
    symbol: string;
    decimals: number;
    image: string;
    verification: string;
}
