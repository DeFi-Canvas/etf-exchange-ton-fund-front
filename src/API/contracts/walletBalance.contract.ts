import * as t from 'io-ts';

const assetCodec = t.type({
  balance: t.number,
  image_url: t.string,
  name: t.string,
  price: t.number,
  symbol: t.string,
  value: t.number
});

export const walletBalanceCodec = t.type({
  assets: t.array(assetCodec),
  total: t.number
});
