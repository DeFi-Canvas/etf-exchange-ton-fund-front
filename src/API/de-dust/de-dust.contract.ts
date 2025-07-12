import * as t from 'io-ts';

//swap/initiate
export const swapInitiateSuccessCodec = t.type({
    transactionId: t.string,
});
export type SwapInitiateSuccess = t.TypeOf<typeof swapInitiateSuccessCodec>;

export const swapInitiateErrorCodec = t.type({
    message: t.string,
});

export type SwapInitiateError = t.TypeOf<typeof swapInitiateErrorCodec>;

export const swapInitiateCodec = t.union([
    swapInitiateSuccessCodec,
    swapInitiateErrorCodec,
]);

export const swapInitiateCodecResponseCodec = t.type({
    payload: swapInitiateSuccessCodec,
});

export type DeDustSwapResult = SwapInitiateSuccess | SwapInitiateError;
