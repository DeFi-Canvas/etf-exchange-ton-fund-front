import {
    Assets,
    assetsCodec,
    AssetsPnl,
    assetsPnlCodec,
} from './assets-card.model';
// Templates
import AssetsCardDefault from './components/assets-card-default.component.tsx';
import AssetsCardPnl from './components/assets-card-pnl.component.tsx';

type AssetsCardType = 'pnl' | 'default';

type AssetsCard = (Assets | AssetsPnl) & { type?: AssetsCardType };

export const AssetsCard = ({ type = 'default', ...props }: AssetsCard) => {
    switch (type) {
        case 'default':
            return assetsCodec.is(props) && <AssetsCardDefault {...props} />;
        case 'pnl':
            return assetsPnlCodec.is(props) && <AssetsCardPnl {...props} />;
        default:
            break;
    }
};
