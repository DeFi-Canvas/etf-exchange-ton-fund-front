import * as t from 'io-ts';

// tasks
const taskCodec = t.type({
    TelegramID: t.number,
    ID: t.string,
    Title: t.string,
    Url: t.string,
    Reward: t.number,
    Completed: t.boolean,
    ChannelID: t.number,
});

export const taskListCodec = t.array(taskCodec);
