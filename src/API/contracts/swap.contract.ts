import * as t from 'io-ts';

//swap/initiate
export const swapInitiateCodec = t.type({
    message: t.string,
    transaction_ids: t.array(t.string),
});
