import { Asset } from '../asset/asset.model';

export interface FundRespnce {
    id: string;
    name: string;
    description: string;
    management_fee: number;
    image_url: string;
    risk_score: string;
    is_avaiable: boolean;
    value: number;
    created_at: string;
}

export interface FundsData {
    id: string;
    name: string;
    description: string;
    managementFee: number;
    logo: string;
    riskScore: string;
    isAvaiable: boolean;
    cost: number;
    assets: Array<Asset & { allocationPercentage: number }>;
    tvlValue: number;
    createdAt: string;
}
