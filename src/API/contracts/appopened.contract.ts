import * as t from 'io-ts';

// /appopened
export const AppOpenedResponseCodec = t.type({
    user_id: t.string,
});
