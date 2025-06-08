import { now } from '@most/core';
import * as E from 'fp-ts/Either';
import { Asset } from '@/instance/asset/asset.model.ts';
import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';

export const NEW_ASETSS_REST_SERVICE = () => ({
    getAssets: (id: string): Stream<Either<never, Asset>> =>
        now(
            E.right({
                id: id,
                name: '',
                ticker: '',
                category: '',
                description: '',
                imageUrl: '',
                price: 1,
                withdrawalFee: 1,
                contractAddress: '',
                address0: '',
                address1: '',
                decimals: 9,
                marketCap: 0,
                networkId: '',
                volume24h: 0,
            })
        ),
});
