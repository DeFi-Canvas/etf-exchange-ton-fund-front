import * as t from 'io-ts';

export const notificationCodec = t.type({
    message: t.string,
    status: t.string,
    timestamp: t.number,
});

// /notifications/{telegram_id}
export const notificationsCodec = t.array(notificationCodec);
