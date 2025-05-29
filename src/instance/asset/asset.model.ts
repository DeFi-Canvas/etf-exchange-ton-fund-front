export interface AssetResponce {
    id: string;
    name: string;
    ticker: string;
    category: string;
    description: string;
    image_url: string;
    price: number;
    withdrawal_fee: number;
}
export interface Asset {
    id: string;
    name: string;
    ticker: string;
    // symbol: string;
    balance: number;
    price: number;
    logo: string;
    value: number;
}
