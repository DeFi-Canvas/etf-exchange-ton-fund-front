import {
    Assets,
    assetsCodec,
    AssetsPnl,
    assetsPnlCodec,
} from './assets-card.model';
// Templates
import CardDefault from './components/card-default/card-default.component.tsx';
import CardPnl from './components/card-pnl/card-pnl.component.tsx';
import { Link } from 'react-router-dom';

type AssetsCardType = 'pnl' | 'default';

type AssetsCard = (Assets | AssetsPnl) & { type?: AssetsCardType };

export const AssetsCard = ({
    type = 'default',
    ...props
}: AssetsCard): JSX.Element => {
    switch (type) {
        case 'default':
            return assetsCodec.is(props) ? (
                <Link to={'/assets/:name'}>
                    <CardDefault {...props} />
                </Link>
            ) : (
                <></>
            );
        case 'pnl':
            return assetsPnlCodec.is(props) ? (
                <Link to={'/assets/:name'}>
                    <CardPnl {...props} />
                </Link>
            ) : (
                <></>
            );
    }
};
