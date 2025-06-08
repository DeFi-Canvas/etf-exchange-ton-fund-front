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
