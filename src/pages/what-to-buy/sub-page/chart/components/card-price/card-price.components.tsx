import css from './card-price.module.css';
import cn from 'classnames';

interface CardPriceProps {
    className?: string;
}

const CardPrice = (props: CardPriceProps) => {
    return (
        <div className={cn(css.priceInfo, props.className)}>
            <div className={css.price}>
                <span>$ 100 954</span>
                <span className={css.priceRemains}>,89</span>
            </div>
            <div className={css.priceProgress}>
                <span>+ 32,94 USD</span>
                <span className={css.dot}></span>
                <span>4,72%</span>
            </div>
        </div>
    );
};

export default CardPrice;
