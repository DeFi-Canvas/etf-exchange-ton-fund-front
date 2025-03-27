import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { injectable } from '@injectable-ts/core';
import { newNotificationsRestService } from '@/API/notifications.service';
import { NotificationUI } from './notifications.page';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as NEA from 'fp-ts/NonEmptyArray';
import * as R from 'fp-ts/Record';
import { flow, pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';

export interface NotificationsStore {
    notifications: Property<E.Either<string, Array<NotificationUI>>>;
}

export type NewNotificationsStore = ValueWithEffect<NotificationsStore>;

export const newNewNotificationsStore = injectable(
    newNotificationsRestService,
    (service): NewNotificationsStore => {
        const notifications = newLensedAtom<
            E.Either<string, Array<NotificationUI>>
        >(E.left('pending'));

        const getNotificationsEffect = pipe(
            service.getNotifications(),
            tap((notificationsData) => {
                pipe(
                    notificationsData,
                    E.map(
                        flow(
                            A.map((n) => ({
                                date: new Date(n.timestamp)
                                    .toISOString()
                                    .split('T')[0],
                                data: {
                                    status: n.status,
                                    title: 'title',
                                    subTitle: 'subTitle',
                                },
                            })),
                            NEA.groupBy((item) => item.date),
                            R.mapWithIndex((date, items) => ({
                                date,
                                body: items.map((item) => item.data),
                            })),
                            Object.values
                        )
                    ),
                    notifications.set
                );
            })
        );

        return valueWithEffect.new({ notifications }, getNotificationsEffect);
    }
);
