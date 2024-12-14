// Templates
import { AttentionIcon } from '@/components/Icons/Icons';
// Style
import css from './purchase-sell-attention.module.css';

const PurchaseSellAttention = () => {
    return (
        <div className={css.card}>
            <div className={css.icon}>
                <AttentionIcon />
            </div>
            <div className={css.divider}></div>
            <div>
                <span className={css.cardTitle}>Attention</span>
                <p className={css.cardText}>
                    Investments in the funds are in the beta testing phase.
                    Please consider the risks.
                </p>
            </div>
        </div>
    );
};

export default PurchaseSellAttention;
