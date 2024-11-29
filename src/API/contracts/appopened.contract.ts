import * as t from 'io-ts';

export const AppOpenedResponseCodec = t.type({
    user_id: t.string,
});
