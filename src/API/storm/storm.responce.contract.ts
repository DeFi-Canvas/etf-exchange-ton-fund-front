import * as t from 'io-ts';

export const stormAnswer = t.type({
    transaction: t.string,
});
export type StormAnswer = t.TypeOf<typeof stormAnswer>;

export const stormAnswerResponseCodec = t.type({
    payload: stormAnswer,
});

export type StormAnswerResponse = t.TypeOf<typeof stormAnswerResponseCodec>;
