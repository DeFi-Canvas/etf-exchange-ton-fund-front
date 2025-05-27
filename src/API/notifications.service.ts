import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { getRequestGenerated } from './request.utils';
import { DOMAIN_API_URL } from './API';
import { NotificationsApi } from './scheme/rest-genereted/api';
import { Configuration } from './scheme/rest-genereted';
import { Notification } from '../pages/notifications/notifications.model';
import { notificationsCodec } from './contracts/notifications.contract';

const notificationsApi = new NotificationsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export interface NotificationsRestService {
    getNotifications: () => Stream<Either<string, Array<Notification>>>;
}

export const newNotificationsRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): NotificationsRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getNotifications: getRequestGenerated(
                notificationsApi.notificationsTelegramIdGet(`${telegram_id}`),
                notificationsCodec
            ),
        };
    }
);
