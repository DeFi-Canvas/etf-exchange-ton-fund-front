import * as t from 'io-ts';

//swap/initiate
export const swapInitiateSuccessCodec = t.type({
    // message: t.string,
    transactionId: t.string,
});

export const swapInitiateErrorCodec = t.type({
    error: t.string,
});

export const swapInitiateCodec = t.union([
    swapInitiateSuccessCodec,
    swapInitiateErrorCodec,
]);
