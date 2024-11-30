import * as t from 'io-ts';

// /appopened
export const appOpenedResponseCodec = t.type({
    user_id: t.string,
});
