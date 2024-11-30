import * as t from 'io-ts';

// /fund/{fund_id}
const assetCodec = t.type({
  category: t.string,
  description: t.string,
  image_url: t.string,
  name: t.string,
  price: t.number,
  ticker: t.string,
  withdrawal_fee: t.number
});

const assetItemCodec = t.type({
  allocation_percentage: t.number,
  asset: assetCodec,
  contractAddress: t.string,
  routerVersion: t.number
});

export const mainResponseCodec = t.type({
  assets: t.array(assetItemCodec),
  description: t.string,
  id: t.string,
  image_url: t.string,
  is_avaiable: t.boolean,
  is_dao: t.boolean,
  management_fee: t.number,
  name: t.string,
  ptonAddress: t.string,
  risk_score: t.string,
  updated_event: t.string,
  value: t.number
});