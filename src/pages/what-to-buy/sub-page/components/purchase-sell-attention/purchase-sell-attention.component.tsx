// Templates
import { AttentionIcon } from '@/components/Icons/Icons';
// Style
import css from './purchase-sell-attention.module.css';

interface PurchaseSellAttentionProps {
    title: string;
    text: string;
}

const PurchaseSellAttention = ({ title, text }: PurchaseSellAttentionProps) => {
    return (
        <div className={css.card}>
            <div className={css.icon}>
                <AttentionIcon />
            </div>
            <div className={css.divider}></div>
            <div>
                <span className={css.cardTitle}>{title}</span>
                <p className={css.cardText}>{text}</p>
            </div>
        </div>
    );
};

export default PurchaseSellAttention;
