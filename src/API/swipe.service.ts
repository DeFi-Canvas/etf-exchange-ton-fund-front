import { Stream } from '@most/types';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import axios from 'axios';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { AssetsApi, Configuration, SwapApi } from './scheme/rest-genereted';
import { Either } from 'fp-ts/lib/Either';
import { Asset } from '@/pages/whalet/whalet.model';
import { getRequestGenerated } from './request.utils';
import { assetsCodec } from './contracts/assets.contract';
import { swapInitiateCodec } from './contracts/swap.contract';

export interface SwapRestService {
    getConnection: () => Stream<unknown>;
    initiate: (args: { amount: number; tokens: Array<string> }) => void;
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
                    console.log('event', event);
                    messege.set(event);
                };

                eventSource.onerror = (error) => {
                    console.error(error);
                };

                //TODO: КАК закрывать соединение пока хз
                return pipe(messege, fromProperty);
            },
            initiate: ({ amount, tokens }) =>
                getRequestGenerated(
                    swapApi.swapInitiatePost({
                        amount,
                        tokens,
                        telegram_id: `${telegram_id ?? 0}`,
                    }),
                    swapInitiateCodec
                ),

            getAssets: getRequestGenerated(
                assetsApi.assetsGet(),
                assetsCodec,
                (x) => ({ ...x, logo: x.image_url })
            ),
        };
    }
);
