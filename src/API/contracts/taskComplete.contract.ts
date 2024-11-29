import * as t from 'io-ts';

export const taskCompleteResponseCodec = t.type({
    message: t.string,
    success: t.boolean
});
