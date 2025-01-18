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
            id: 'string',
            name: 'string',
            ticker: 'string',
            category: 'string',
            description: 'string',
            image_url: 'string',
        };
        expect(mapDepositAssets(data)).toStrictEqual({
            id: 'string',
            name: 'string',
            ticker: 'string',
            description: 'string',
            category: 'string',
            img: 'string',
        });
    });
});
