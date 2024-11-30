import * as t from 'io-ts';

// /wallet/buyindex
export const buyIndexResponseCodec = t.type({
    message: t.string,
    status: t.boolean,
    transaction: t.string
});
