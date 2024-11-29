import * as t from 'io-ts';

const userCodec = t.type({
    first_name: t.string,
    id: t.string,
    last_name: t.string,
    memo: t.number,
    telegram_id: t.number,
    username: t.string,
});

export const usersCodec = t.array(userCodec);