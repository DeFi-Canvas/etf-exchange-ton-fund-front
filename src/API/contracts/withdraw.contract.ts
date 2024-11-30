import * as t from 'io-ts';

// /withdraw
export const withdrawResponseCodec = t.type({
    status: t.boolean,
    message: t.string,
    transaction: t.string,
});
