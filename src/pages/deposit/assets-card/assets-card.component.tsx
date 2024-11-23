import { Asset, AssetCodec } from '@/pages/whalet/whalet.model';
import { AssetsViewModelInit } from '../assets/assets.view-model';
import { DepositAssetsCodec, DepositAssets } from '../deposit.model';
import css from './assets-card.module.css';

type AssetsCardProps = (DepositAssets | Asset) & {
    type: AssetsViewModelInit;
};
export const AssetsCard = ({ type, ...rest }: AssetsCardProps) => {
    switch (type) {
        case 'deposit':
            return (
                DepositAssetsCodec.is(rest) && <AssetsCardDeposit {...rest} />
            );
        case 'withdrow':
            return AssetCodec.is(rest) && <AssetsCardWithdrow {...rest} />;
        default:
            break;
    }
};

export const AssetsCardDeposit = ({ name, ticker, img }: DepositAssets) => {
    return (
        <div className={css.wrap}>
            <img src={img} className={css.img} />
            <div className={css.infoWrap}>
                <span className={css.name}>{name}</span>
                <span className={css.ticker}>{ticker}</span>
            </div>
        </div>
    );
};

export const AssetsCardWithdrow = ({ name, logo, value, symbol }: Asset) => {
    return (
        <div className={css.wrap}>
            <img src={logo} className={css.img} />
            <div className={css.infoWrap}>
                <span className={css.name}>
                    {value} {name}
                </span>
                <span className={css.ticker}>{symbol}</span>
            </div>
        </div>
    );
};
