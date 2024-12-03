import * as t from 'io-ts';

// wallet/funds

const fundItem = t.type({
    total: t.number,
    funds: t.union([
        t.array(
            t.type({
                fund: t.type({
                    id: t.string,
                    name: t.string,
                    description: t.string,
                    management_fee: t.number,
                    image_url: t.string,
                    is_dao: t.boolean,
                    risk_score: t.string,
                    updated_event: t.string,
                    is_avaiable: t.boolean,
                    assets: t.unknown,
                    value: t.number,
                }),
                value: t.number,
            })
        ),
        t.undefined,
    ]),
});
export const walletFundsCodec = fundItem;
