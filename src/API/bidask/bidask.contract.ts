import * as t from 'io-ts';

// #region Deposit
export const depositBidaskPayload = t.type({
    poolAddress: t.string,
    token0Amount: t.number,
    token0Ticker: t.string,
    token1Amount: t.number,
    token1Ticker: t.string,
});

export type DepositBidaskPayload = t.TypeOf<typeof depositBidaskPayload>;

export const depositBidaskCodec = t.type({
    payload: depositBidaskPayload,
});

export type DepositBidask = t.TypeOf<typeof depositBidaskCodec>;

export const defaultBidaskAnswer = t.type({
    transaction: t.string,
});
export type DefaultBidaskAnswer = t.TypeOf<typeof defaultBidaskAnswer>;

export const defaultResponceBidaskCodec = t.type({
    payload: t.type({
        transaction: t.string,
    }),
});
export type DefaultResponceBidask = t.TypeOf<typeof defaultResponceBidaskCodec>;

// #region Withdraw
export const withdrawBidaskPayload = t.type({
    poolAddress: t.string,
});

export type WithdrawBidaskPayload = t.TypeOf<typeof withdrawBidaskPayload>;

export const withdrawBidaskCodec = t.type({
    payload: withdrawBidaskPayload,
});

export type WithdrawBidask = t.TypeOf<typeof withdrawBidaskCodec>;
