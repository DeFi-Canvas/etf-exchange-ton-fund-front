import * as t from 'io-ts';

const userCodec = t.type({
  address: t.string,
  id: t.string,
  network_id: t.string,
  secretKey: t.string,
  userID: t.string
});

export const userWalletCodec = t.array(userCodec);