import CardPrice from '../card-price/card-price.components';
import css from './chart-invested-card.module.css';

const ChartInvestedCard = () => {
    return (
        <div className={css.card}>
            <span className={css.cardTitle}>Invested</span>
            <CardPrice className={css.cardPrice} />
        </div>
    )
}

export default ChartInvestedCard;
