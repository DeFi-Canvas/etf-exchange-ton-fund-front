import css from './price.module.css';
import cn from 'classnames';

interface CardPriceProps {
    className?: string;
    //TODO: сделать обязательным
    value?: number;
}

export const CardPrice = ({ className, value }: CardPriceProps) => {
    return (
        <div className={cn(css.priceInfo, className)}>
            <div className={css.price}>
                <span>$ {value}</span>
                {/* <span className={css.priceRemains}>,89</span> */}
            </div>
            {/* <div className={css.priceProgress}>
                <span>+ 32,94 USD</span>
                <span className={css.dot}></span>
                <span>4,72%</span>
            </div> */}
        </div>
    );
};
