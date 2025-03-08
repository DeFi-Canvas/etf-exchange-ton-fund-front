import { Stream } from '@most/types';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { AssetsApi, Configuration, SwapApi } from './scheme/rest-genereted';
import { Either } from 'fp-ts/lib/Either';
import { getRequestGenerated } from './request.utils';
import { assetsCodec } from './contracts/assets.contract';
import { swapInitiateCodec } from './contracts/swap.contract';
import { Asset } from '@/instance/asset/asset.model';

export interface SwapRestService {
    getConnection: () => { evs: Stream<unknown>; unsubscription: () => void };
    initiate: (args: {
        amount: number;
        tokens: Array<string>;
    }) => Stream<Either<string, unknown>>;
    getAssets: () => Stream<Either<string, Array<Asset>>>;
}

const assetsApi = new AssetsApi({
    basePath: DOMAIN_API_URL,
} as Configuration);
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
                    console.log('event 1', event);
                    messege.set(event.data);
                };

                eventSource.onerror = (error) => {
                    console.log('ALARM', error);

                    messege.set('ERROR');
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
                        tokens,
                        telegram_id: telegram_id ?? 0,
                    }),
                    swapInitiateCodec
                )(),

            getAssets: getRequestGenerated(
                assetsApi.assetsGet(),
                assetsCodec,
                (x) => ({ ...x, logo: x.image_url })
            ),
        };
    }
);
