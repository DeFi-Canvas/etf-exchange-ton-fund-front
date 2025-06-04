import { describe, expect, it } from 'vitest';
import { assetsMapping } from '../asset-single.model';

describe('asset-single.model', () => {
    it('should return mapped data', () => {
        const data = {
            payload: {
                id: 'string',
                name: 'string',
                ticker: 'string',
                category: 'string',
                description: 'string',
                imageUrl: 'string',
                price: 1,
                withdrawalFee: 1,
            },
        };

        expect(assetsMapping(data)).toStrictEqual({
            id: data.payload.id,
            name: data.payload.name,
            ticker: data.payload.ticker,
            description: data.payload.description,
            price: data.payload.price,
            imageUrl: data.payload.imageUrl,
            withdrawalFee: data.payload.withdrawalFee,
        });
    });
});
