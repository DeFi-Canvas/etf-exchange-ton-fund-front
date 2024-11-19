// Templates
import { AttentionIcon } from '@/components/Icons/Icons';
// Style
import css from './purchase-sell-attention.module.css';

const PurchaseSellAttention = () => {
    return (
        <div className={css.card}>
            <header className={css.cardHeader}>
                <AttentionIcon />
                <span>Attention</span>
            </header>
            <div className={css.cardContent}>
                Investments in the funds are in the beta testing phase. Please consider the risks.
            </div>
        </div>
    )
}

export default PurchaseSellAttention;
