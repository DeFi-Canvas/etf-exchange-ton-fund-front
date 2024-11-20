import { FundsRespnce } from '../whalet/whalet.model';

export interface FundsData {
    id: string;
    name: string;
    description: string;
    managementFee: number;
    logo: string;
    isDao: false;
    riskScore: string;
    updatedEvent: string;
    isAvaiable: boolean;
    cost: number;
}

export const mapFunds = (data: FundsRespnce): FundsData => ({
    id: data.id,
    name: data.name,
    description: data.description,
    managementFee: data.management_fee,
    logo: data.image_url,
    isDao: data.is_dao,
    riskScore: data.risk_score,
    updatedEvent: data.updated_event,
    isAvaiable: data.is_avaiable,
    cost: 1,
});
