import { Stream } from '@most/types';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { Either } from 'fp-ts/lib/Either';
import { Error } from '@/store/errors/error-system';
import { DeDustRestService } from './de-dust/de-dust.service';

export interface SwapRestService {
    getConnection: () => { evs: Stream<unknown>; unsubscription: () => void };
    initiate: (args: {
        amount: number;
        tokens: Array<string>;
    }) => Stream<Either<Error, unknown>>;
}

export const newSwapRestService = injectable(
    DeDustRestService,
    (deDustRestService) =>
        (telegram_id: number): SwapRestService => {
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
                initiate: deDustRestService.swapInitiate,
            };
        }
);

export const SwapService = token('swapService')<SwapRestService>();
