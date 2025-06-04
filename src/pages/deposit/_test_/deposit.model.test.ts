import { describe, expect, it } from 'vitest';
import { mapDepositAssets, mapDepositDetails } from '../deposit.model';

describe('newNewUserStoreService', () => {
    it('should return mapped DepositDetails', () => {
        const data = {
            address: 'string',
            memo: 'string',
            qrimgsrc: 'string',
        };
        expect(mapDepositDetails(data)).toStrictEqual({
            address: 'string',
            memo: 'string',
            qrCode: 'string',
        });
    });

    it('should return mapped DepositAssets', () => {
        const data = {
            payload: [
                {
                    id: 'string',
                    name: 'string',
                    ticker: 'string',
                    description: 'string',
                    imageUrl: 'string',
                    price: 0,
                    withdrawalFee: 0,
                },
            ],
        };
        expect(mapDepositAssets(data)).toStrictEqual([
            {
                id: 'string',
                name: 'string',
                ticker: 'string',
                description: 'string',
                img: 'string',
            },
        ]);
    });
});
