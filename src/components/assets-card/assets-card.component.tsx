import {
    Assets,
    assetsCodec,
    AssetsPnl,
    assetsPnlCodec,
} from './assets-card.model';
// Templates
import CardDefault from './components/card-default/card-default.component.tsx';
import CardPnl from './components/card-pnl/card-pnl.component.tsx';

type AssetsCardType = 'pnl' | 'default';

type AssetsCard = (Assets | AssetsPnl) & { type?: AssetsCardType };

export const AssetsCard = ({
    type = 'default',
    ...props
}: AssetsCard): JSX.Element => {
    switch (type) {
        case 'default':
            return assetsCodec.is(props) ? <CardDefault {...props} /> : <></>;
        case 'pnl':
            return assetsPnlCodec.is(props) ? <CardPnl {...props} /> : <></>;
    }
};
