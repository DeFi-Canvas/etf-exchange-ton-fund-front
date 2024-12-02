import * as t from 'io-ts';

// /funds
export const allFundsCodec = t.array(
    t.type({
        assets: t.unknown,
        description: t.string,
        id: t.string,
        image_url: t.string,
        is_avaiable: t.boolean,
        is_dao: t.boolean,
        management_fee: t.number,
        name: t.string,
        risk_score: t.string,
        updated_event: t.string,
        value: t.number,
    })
);
