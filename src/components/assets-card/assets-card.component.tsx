import {
    Assets,
    assetsCodec,
    AssetsPnl,
    assetsPnlCodec,
} from './assets-card.model';

type AssetsCardType = 'pnl' | 'def';

type AssetsCard = (Assets | AssetsPnl) & { type?: AssetsCardType };

export const AssetsCard = ({ type = 'def', ...props }: AssetsCard) => {
    switch (type) {
        case 'def':
            return assetsCodec.is(props) && <>{props.price}</>;
        case 'pnl':
            return assetsPnlCodec.is(props) && <>{props.pnl.value}</>;
        default:
            break;
    }
};
