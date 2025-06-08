import { describe, expect, it } from 'vitest';
import { assetResponseMapping } from '../asset-single.model';

describe('asset-single.model', () => {
    it('should return mapped data', () => {
        const data = {
            payload: {
                id: 'string',
                name: 'string',
                contract_address: 'string',
                address0: 'string',
                address1: 'string',
                decimals: 1,
                description: 'string',
                image_url: 'string',
                market_cap: 1,
                network_id: 'string',
                price: 1,
                ticker: 'string',
                volume_24h: 1,
                withdrawal_fee: 1,
            },
        };

        const expected = {
            id: data.payload.id,
            name: data.payload.name,
            ticker: data.payload.ticker,
            description: data.payload.description,
            price: data.payload.price,
            imageUrl: data.payload.image_url,
            withdrawalFee: data.payload.withdrawal_fee,
            contractAddress: data.payload.contract_address,
            address0: data.payload.address0,
            address1: data.payload.address1,
            decimals: data.payload.decimals,
            marketCap: data.payload.market_cap,
            networkId: data.payload.network_id,
            volume24h: data.payload.volume_24h,
        };

        expect(assetResponseMapping(data)).toStrictEqual(expected);
    });
});
