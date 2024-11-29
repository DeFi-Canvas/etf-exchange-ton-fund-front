import * as t from 'io-ts';

export const DepositResponseCodec = t.type({
    address: t.string,
    memo: t.string,
    qrimgsrc: t.string,
});