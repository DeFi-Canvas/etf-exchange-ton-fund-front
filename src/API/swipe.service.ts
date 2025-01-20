import { Stream } from '@most/types';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { fromPromise } from '@most/core';
import axios from 'axios';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';

export interface SwipeRestService {
    getConnection: () => Stream<unknown>;
    initiate: () => void;
}

export const newSwipeRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): SwipeRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getConnection: () => {
                const messege = newLensedAtom<any>(undefined);
                const eventSource = new EventSource(
                    DOMAIN_API_URL + `/stream/${telegram_id}`
                );

                eventSource.onmessage = (event) => {
                    console.log('event', event);
                    messege.set(event);
                };

                eventSource.onerror = (error) => {
                    console.error(error);
                };

                //TODO: КАК закрывать соединение пока хз
                return pipe(messege, fromProperty);
            },
            initiate: () => {
                axios.post(DOMAIN_API_URL + '/swap/initiate', {
                    amount: 0,
                    ticker_from_token: 'BTC',
                    ticker_to_token: 'ETH',
                    user_id: `${telegram_id ?? 0}`,
                });
            },
        };
    }
);
