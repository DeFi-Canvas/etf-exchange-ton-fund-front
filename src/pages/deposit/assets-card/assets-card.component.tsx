import { AssetsViewModelInit } from '../assets/assets.view-model';
import css from './assets-card.module.css';
import * as t from 'io-ts';

export interface DepositAsserts {
    name: string;
    ticker: string;
    category: string;
    description: string;
    img: string;
}
const DepositAssertsCodec = t.type({
    name: t.string,
    ticker: t.string,
    category: t.string,
    description: t.string,
    img: t.string,
});

export interface WithdrowAsserts {
    name: string;
    ticker: string;
    description: string;
    img: string;
    amount: number;
}
const WithdrowAssertsCodec = t.type({
    name: t.string,
    ticker: t.string,
    description: t.string,
    img: t.string,
    amount: t.number,
});

type AssetsCardProps = (DepositAsserts | WithdrowAsserts) & {
    type: AssetsViewModelInit;
};
export const AssetsCard = ({ type, ...rest }: AssetsCardProps) => {
    console.log(type, 'AssetsCard');

    switch (type) {
        case 'deposit':
            return (
                DepositAssertsCodec.is(rest) && <AssetsCardDeposit {...rest} />
            );
        case 'withdrow':
            return (
                WithdrowAssertsCodec.is(rest) && (
                    <AssetsCardWithdrow {...rest} />
                )
            );
        default:
            break;
    }
};

export const AssetsCardDeposit = ({ name, ticker, img }: DepositAsserts) => {
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
}: WithdrowAsserts) => {
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
