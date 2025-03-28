import { AssetsUI } from '@/components/assets-card/assets-card.model';
import { constant, flow, pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/Either';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';
import { Asset } from '@/instance/asset/asset.model';

export type SwapResultStatus = 'SUCCESS' | 'ERROR' | 'PROGRESS';
export type SwapBtnError = 'INSUFFICIENT_BALANCE' | 'EMPTY_FIELD';

export const SHODOW_SWAP = 0.99;

export interface SwapAsset {
    id: string;
    imageSrc: string;
    assetName: string;
    price: number;
    currentValue: number;
    balanceInWalet: number;
    valueInStableCoin?: string;
    hasError: boolean;
}

export interface FiltrebleSwapAsset extends Asset {
    isVisible: boolean;
}

export const mapAssetToFiltrebleSwapAsset = (
    asset: Asset
): FiltrebleSwapAsset => ({ ...asset, isVisible: true });

export type InitialAssetName = 'TON';
export const INITIAL_ASSET_NAME: InitialAssetName = 'TON';

export const SWAP_LIST_INFO_INIT = [];

export const formatValueInStableCoin = (price: number) =>
    `≈ $ ${price.toFixed(2)}`;

export const mapAssetToSwapAsset = (asset: Asset): SwapAsset => ({
    id: asset.id,
    imageSrc: asset.logo,
    assetName: asset.ticker,
    price: asset.price,
    balanceInWalet: asset.balance ?? 0,
    currentValue: 0,
    valueInStableCoin: `≈ $ 0`,
    hasError: false,
});

export interface AssetsUIFiltreble
    extends AssetsUI,
        Pick<FiltrebleSwapAsset, 'isVisible'> {}

export const mapAssetsWaletToCard = (
    asset: FiltrebleSwapAsset
): AssetsUIFiltreble => ({
    id: asset.id,
    img: asset.logo,
    title: `${asset.ticker}`,
    subTitle: `${asset.name}`,
    price: `$ ${asset.price}`,
    priceText: '',
    isVisible: asset.isVisible,
});

export const getAssetsEffectMapping = (
    assets: E.Either<string, Asset[]>,
    waletAssets: E.Either<string, Asset[]>,
    swapAssetsSet: (a: E.Either<string, SwapAsset[]>) => void
) =>
    pipe(
        assets,
        E.map((allAssets) =>
            pipe(
                allAssets,
                A.filter(
                    (x) =>
                        x.name === INITIAL_ASSET_NAME ||
                        x.name === 'USDT' ||
                        x.name === 'Tether'
                ),
                A.map(mapAssetToSwapAsset),
                (x) => {
                    const tonAsset =
                        x.find((x) => x.assetName === INITIAL_ASSET_NAME) ??
                        undefined;

                    const restAsset = x.filter(
                        (x) => x.assetName !== INITIAL_ASSET_NAME
                    );
                    if (tonAsset) {
                        return [tonAsset, ...restAsset];
                    } else {
                        return [];
                    }
                },
                A.map((x) => {
                    const currentWaletAssets = waletAssets;
                    if (E.isRight(currentWaletAssets)) {
                        const data = currentWaletAssets.right;
                        return pipe(
                            data,
                            A.findFirst(
                                (dataEl) => x.assetName === dataEl.name
                            ),
                            O.fold(
                                () => x,
                                (dataEl) => ({
                                    ...x,
                                    balanceInWalet: dataEl.balance,
                                })
                            )
                        );
                    }
                    return x;
                }),
                E.fromPredicate(
                    (x) => x.length > 0,
                    () => 'Error'
                ),
                swapAssetsSet
            )
        )
    );

export const prepareMapSwapAfterSwap = (
    asset: SwapAsset,
    action: 'plus' | 'minus'
) =>
    flow(
        A.findFirst((waletAsset: Asset) => waletAsset.id === asset.id),
        E.fromOption(constant('error')),
        E.map((waletAsset) => ({
            ticker: asset.assetName,
            balance:
                action === 'plus'
                    ? `${waletAsset.balance + (asset.currentValue ?? 0)}`
                    : `${waletAsset.balance - (asset.currentValue ?? 0)}`,
        }))
    );

export const mapOptionsToShow =
    (texts: { detailsName: string; resultName: string }) =>
    (data: { ticker: string; balance: string }) => ({
        result: {
            name: `${texts.resultName} ${data.ticker}`,
            value: data.balance,
        },
        details: {
            name: `${data.ticker} ${texts.detailsName}`,
            value: [data.balance],
        },
    });
