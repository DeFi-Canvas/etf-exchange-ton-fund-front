import * as t from 'io-ts';

// /deposit
export const depositResponseCodec = t.type({
    address: t.string,
    memo: t.string,
    qrimgsrc: t.string,
});
