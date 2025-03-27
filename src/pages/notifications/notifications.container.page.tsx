import { injectable, token } from '@injectable-ts/core';
import { Notifications } from './notifications.page';
import { newNewNotificationsStore } from './notifications.store';
import { memo } from 'react';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { UserStoreService } from '@/store/user.store';
import { useProperty } from '@frp-ts/react';

const NOTIFICATIONS_MOCK = [
    {
        date: 'Today',
        body: [
            {
                status: 'DEPOSIT',
                title: 'Deposit',
                subTitle: 'Amount: 1100 USD₮',
            },
            {
                status: 'WITHDRAW',
                title: 'WITHDRAW',
                subTitle: 'Try again later',
            },
        ],
    },
    {
        date: '10 Oct, 2024',
        body: [
            {
                status: 'DEPOSIT',
                title: 'Deposit',
                subTitle: 'Amount: 1100 USD₮',
            },
            {
                status: 'WITHDRAW',
                title: 'WITHDRAW',
                subTitle: 'Try again later',
            },
        ],
    },
];

export const NotificationsPageContainer = injectable(
    token('userStore')<UserStoreService>(),

    (userStore) =>
        memo(() => {
            const store = useValueWithEffect(
                () => newNewNotificationsStore({ userStore }),
                []
            );
            const notifications = useProperty(store.notifications);

            return <Notifications notifications={notifications} />;
        })
);
