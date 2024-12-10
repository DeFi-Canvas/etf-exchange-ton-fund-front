import { PageType } from '@/pages/what-to-buy/what-to-buy.model';
import css from './purchase-sell-finish-boody-sheet.module.css';

interface PurchaseSellFinishBoodySheetProps {
    value: number; // стоимость 1 куска
    quantity: number;
    totalAmount: number;
    name: string;
    logo: string;
    type: PageType;
}

export const PurchaseSellFinishBoodySheet = ({
    value,
    quantity,
    totalAmount,
    name,
    logo,
    type,
}: PurchaseSellFinishBoodySheetProps) => {
    const operation = type === 'BUY' ? 'purchase' : 'sale';
    return (
        <div className={css.bottomSheetContent}>
            <header className={css.bottomSheetHeader}>
                <img className={css.bottomSheetImage} src={logo} />
                <div className={css.bottomSheetTitle}>
                    The {operation} is successful
                </div>
                <div className={css.bottomSheetSubTitle}>
                    «{name}» fund {operation}
                </div>
            </header>
            <div className={css.bottomSheetInfoList}>
                <div className={css.bottomSheetInfoItem}>
                    <span className={css.bottomSheetInfoItemTitle}>Value</span>
                    <span>$ {value}</span>
                </div>
                <div className={css.bottomSheetInfoItem}>
                    <span className={css.bottomSheetInfoItemTitle}>
                        Quantity
                    </span>
                    <span>{quantity}</span>
                </div>
                <div className={css.bottomSheetInfoItem}>
                    <span className={css.bottomSheetInfoItemTitle}>
                        Total amount
                    </span>
                    <span>$ {totalAmount}</span>
                </div>
            </div>
        </div>
    );
};
