import * as t from 'io-ts';

//endpoint
export const WithdrawResponceCodec = t.type({
    status: t.boolean,
    message: t.string,
    transaction: t.string,
});
