import * as E from 'fp-ts/Either';
import * as O from 'fp-ts/Option';
import * as A from 'fp-ts/Array';
import { constant, flow, identity, pipe } from 'fp-ts/lib/function';
import { SwapAsset } from './swap.model';
import { AssetBalance } from '@/instance/asset/asset.model';

export const getCurrentWaletAsset = (
    currentWaletAssets: E.Either<string, AssetBalance[]>,
    id: string
) =>
    pipe(
        currentWaletAssets,
        E.chain(
            flow(
                A.findFirst((x) => x.id === id),
                E.fromOption(constant('error'))
            )
        ),
        E.fold(() => undefined, identity)
    );

export const getIsIdExistOnSwapAssets = (
    currentSwapAssets: E.Either<string, SwapAsset[]>,
    id: string
) =>
    pipe(
        currentSwapAssets,
        E.chain(
            flow(
                A.filterMap((asset) => (asset.id === id ? O.some(id) : O.none)),
                A.head,
                E.fromOption(constant('error'))
            )
        ),
        E.fold(() => undefined, identity)
    );
