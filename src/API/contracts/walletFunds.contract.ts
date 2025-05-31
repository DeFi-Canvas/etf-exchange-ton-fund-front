import * as t from 'io-ts';
import { assetCodec } from './assets.contract';

// wallet/funds

const fundItem = t.type({
    total: t.number,
    funds: t.array(
        t.type({
            fund: t.type({
                id: t.string,
                name: t.string,
                description: t.string,
                management_fee: t.number,
                image_url: t.string,
                is_dao: t.boolean,
                risk_score: t.string,
                is_available: t.boolean,
                value: t.number,
                author: t.string,
                created_at: t.string,
                priority_number: t.number,
                // assets: t.unknown,
                assets: t.array(
                    t.type({
                        asset: assetCodec,
                        allocation_percentage: t.number,
                        dex_token_address_0: t.string,
                        dex_token_address_1: t.string,
                    })
                ),
            }),
            value: t.number,
        })
    ),
});

export const walletFundsCodec = fundItem;
