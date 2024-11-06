import css from './assets-card.module.css';

export interface DepositAsserts {
    name: string;
    ticker: string;
    category: string;
    description: string;
    img: string;
}
export const AssetsCard = ({ name, ticker, img }: DepositAsserts) => {
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
