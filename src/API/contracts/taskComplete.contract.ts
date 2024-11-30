import * as t from 'io-ts';

// /tasks/complete
export const taskCompleteResponseCodec = t.type({
    message: t.string,
    success: t.boolean
});
