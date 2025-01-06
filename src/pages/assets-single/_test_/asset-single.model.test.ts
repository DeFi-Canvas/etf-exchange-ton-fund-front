import { describe, expect, it } from 'vitest';
import { assetMapping } from '../asset-single.model';

describe('asset-single.model', () => {
    it('should return mapped data', () => {
        const data = {
            id: 'string',
            name: 'string',
            ticker: 'string',
            category: 'string',
            description: 'string',
            image_url: 'string',
            price: 1,
            withdrawal_fee: 1,
        };

        expect(assetMapping(data)).toStrictEqual({
            ...data,
            imageUrl: data.image_url,
            withdrawalFee: data.withdrawal_fee,
        });
    });
});
