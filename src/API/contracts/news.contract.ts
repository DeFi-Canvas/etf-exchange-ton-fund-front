import * as t from 'io-ts';

//news
const newsCodec = t.type({
    content: t.string,
    published_at: t.string,
    source: t.string,
    title: t.string,
});

export const newsResponseCodec = t.array(newsCodec);
