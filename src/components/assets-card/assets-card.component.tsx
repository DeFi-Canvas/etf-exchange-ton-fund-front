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
    const linkTo = '/assets/:name';

    switch (type) {
        case 'default':
            return assetsCodec.is(props) ? (
                // TODO:N Мистер фиш, почините это плс, чтоб была возможность снаружи прокидывать куда мы топаем, но решалось всё внутри
                <CardDefault {...props} />
            ) : (
                <></>
            );
        case 'pnl':
            return assetsPnlCodec.is(props) ? (
                <Link to={linkTo}>
                    <CardPnl {...props} />
                </Link>
            ) : (
                <></>
            );
    }
};
