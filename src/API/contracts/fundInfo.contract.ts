import * as t from 'io-ts';

export const fundInfoResponseCodec = t.type({
    holders: t.number,
    tvl: t.number
});
