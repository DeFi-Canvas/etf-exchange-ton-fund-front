import { Stream } from '@most/types';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { Configuration, SwapApi } from './scheme/rest-genereted';
import { Either } from 'fp-ts/lib/Either';
import { getRequestGenerated } from './request.utils';
import { swapInitiateCodec } from './contracts/swap.contract';
import { Error } from '@/store/errors/error-system';

export interface SwapRestService {
    getConnection: () => { evs: Stream<unknown>; unsubscription: () => void };
    initiate: (args: {
        amount: number;
        tokens: Array<string>;
    }) => Stream<Either<Error, unknown>>;
}

const swapApi = new SwapApi({
    basePath: DOMAIN_API_URL,
} as Configuration);

export const newSwapRestService = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): SwapRestService => {
        const { id: telegram_id } = userStore.user.get();

        return {
            getConnection: () => {
                const messege = newLensedAtom<any>(undefined);
                const eventSource = new EventSource(
                    DOMAIN_API_URL + `/stream/${telegram_id}`
                );

                eventSource.onmessage = (event) => {
                    messege.set(JSON.parse(event.data));
                };

                eventSource.onerror = (error) => {
                    messege.set('ERROR');
                    console.error(error);
                };

                return {
                    evs: pipe(messege, fromProperty),
                    unsubscription: () => eventSource.close(),
                };
            },
            initiate: ({ amount, tokens }) =>
                getRequestGenerated(
                    swapApi.swapInitiatePost({
                        amount,
                        tickerFrom: tokens[0],
                        tickerTo: tokens[1],
                        telegramId: telegram_id ?? 0,
                    }),
                    swapInitiateCodec
                )(),
        };
    }
);
