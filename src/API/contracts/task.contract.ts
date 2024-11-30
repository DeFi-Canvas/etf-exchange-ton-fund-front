import * as t from 'io-ts';

// tasks
const taskCodec = t.type({
  channelID: t.number,
  completed: t.boolean,
  id: t.string,
  reward: t.number,
  telegramID: t.number,
  title: t.string,
  url: t.string
});

export const taskListCodec = t.array(taskCodec);