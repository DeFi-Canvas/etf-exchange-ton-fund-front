export interface Asset {
    id: string;
    name: string;
    contractAddress: string;
    address0: string;
    address1: string;
    decimals: number;
    description: string;
    imageUrl: string;
    marketCap: number;
    networkId: string;
    price: number;
    ticker: string;
    volume24h: number;
    withdrawalFee: number;
}

export interface AssetBalance {
    id: string;
    name: string;
    ticker: string;
    balance: number;
    price: number;
    logo: string;
    value: number;
}
