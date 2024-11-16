import { AssetsViewModelInit } from '../assets/assets.view-model';
import {
    WithdrowAssets,
    DepositAssetsCodec,
    WithdrowAssetsCodec,
    DepositAssets,
} from '../deposit.model';
import css from './assets-card.module.css';

type AssetsCardProps = (DepositAssets | WithdrowAssets) & {
    type: AssetsViewModelInit;
};
export const AssetsCard = ({ type, ...rest }: AssetsCardProps) => {
    console.log(type, 'AssetsCard');

    switch (type) {
        case 'deposit':
            return (
                DepositAssetsCodec.is(rest) && <AssetsCardDeposit {...rest} />
            );
        case 'withdrow':
            return (
                WithdrowAssetsCodec.is(rest) && <AssetsCardWithdrow {...rest} />
            );
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

export const AssetsCardWithdrow = ({
    name,
    ticker,
    img,
    amount,
}: WithdrowAssets) => {
    return (
        <div className={css.wrap}>
            <img src={img} className={css.img} />
            <div className={css.infoWrap}>
                <span className={css.name}>
                    {amount} {name}
                </span>
                <span className={css.ticker}>{ticker}</span>
            </div>
        </div>
    );
};
