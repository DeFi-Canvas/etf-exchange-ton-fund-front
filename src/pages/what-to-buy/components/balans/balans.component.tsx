import { AlertIcon, PnlArrowUpIcon } from '@/components/Icons/Icons';
import css from './balans.module.css';

export const Balans = () => {
    return (
        <div className={css.wrap}>
            <div className={css.labelWrap}>
                <span className={css.label}>Current balance</span>
                <div className={css.alert}>
                    {/* TODO: по какому принципу появляется оранжевый кружок */}
                    <AlertIcon />
                </div>
            </div>
            <div className={css.balans}>
                {/* TODO: получать с API */}
                <span>$ 1,590</span>
                <span className={css.shadow}>.90</span>
            </div>

            <div className={css.pnl}>
                {/* TODO: получать с API */}
                <PnlArrowUpIcon className={css.icon} />
                <span className={css.val}>12.76%</span>
            </div>
        </div>
    );
};
