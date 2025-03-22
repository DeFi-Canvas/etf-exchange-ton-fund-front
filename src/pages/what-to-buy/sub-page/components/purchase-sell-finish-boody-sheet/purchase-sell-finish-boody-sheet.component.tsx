import { PageType } from '@/pages/what-to-buy/what-to-buy.model';
import css from './purchase-sell-finish-boody-sheet.module.css';

export interface PurchaseSellFinishBoodySheetProps {
    value: number; // стоимость 1 куска
    quantity: number;
    totalAmount: number;
    name: string;
    logo: string;
    type: PageType;
    texts: {
        operation: (operation: string) => string;
        fund: string;
        total: string;
    };
}

export const PurchaseSellFinishBoodySheet = ({
    totalAmount,
    name,
    logo,
    type,
    texts,
}: PurchaseSellFinishBoodySheetProps) => {
    const operation = type === 'BUY' ? 'purchase' : 'sale';
    return (
        <div className={css.bottomSheetContent}>
            <header className={css.bottomSheetHeader}>
                <img className={css.bottomSheetImage} src={logo} />
                <div className={css.bottomSheetTitle}>
                    {texts.operation(operation)}
                </div>
                <div className={css.bottomSheetSubTitle}>
                    «{name}» {texts.fund} {operation}
                </div>
            </header>
            <div className={css.bottomSheetInfoList}>
                <div className={css.bottomSheetInfoItem}>
                    <span className={css.bottomSheetInfoItemTitle}>
                        {texts.total}
                    </span>
                    <span>$ {totalAmount}</span>
                </div>
            </div>
        </div>
    );
};
