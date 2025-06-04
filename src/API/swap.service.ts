import { Stream } from '@most/types';
import { UserStoreService } from '@/store/user.store';
import { injectable, token } from '@injectable-ts/core';
import { DOMAIN_API_URL } from './API';
import { newLensedAtom } from '@frp-ts/lens';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { AssetApi, Configuration, SwapApi } from './scheme/rest-genereted';
import { Either } from 'fp-ts/lib/Either';
import { authRequestOptions, getRequestGenerated } from './request.utils';
import { assetsResponseCodec } from './contracts/assets.contract';
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

const assetsApi = new AssetApi({
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
                    messege.set(JSON.parse(event.data));
                };

                eventSource.onerror = (error) => {
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
                        tickerFrom: tokens[0],
                        tickerTo: tokens[1],
                        telegramId: telegram_id ?? 0,
                    }),
                    swapInitiateCodec
                )(),

            getAssets: getRequestGenerated(
                assetsApi.apiAssetGet(authRequestOptions()),
                assetsResponseCodec,
                (response) => {
                    return response.payload.map((asset) => ({
                        ...asset,
                        logo: asset.imageUrl,
                    }));
                }
            ),
        };
    }
);
