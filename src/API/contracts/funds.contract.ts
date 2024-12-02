import * as t from 'io-ts';

// /funds
export const allFundsCodec = t.array(
    t.type({
        id: t.string,
        name: t.string,
        description: t.string,
        management_fee: t.number,
        image_url: t.string,
        is_dao: t.boolean,
        risk_score: t.string,
        updated_event: t.string,
        is_avaiable: t.boolean,
        PTonAddress: t.string,
        assets: t.unknown,
        value: t.number,
    })
);
