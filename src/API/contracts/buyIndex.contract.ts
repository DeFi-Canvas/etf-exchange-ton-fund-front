import * as t from 'io-ts';

export const buyIndexResponseCodec = t.type({
    message: t.string,
    status: t.boolean,
    transaction: t.string
});
