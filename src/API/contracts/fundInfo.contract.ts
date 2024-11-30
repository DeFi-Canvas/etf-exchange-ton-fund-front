import * as t from 'io-ts';

// /fundInfo
export const fundInfoResponseCodec = t.type({
    holders: t.number,
    tvl: t.number
});
