import {
    AlertIcon,
    // PnlArrowUpIcon
} from '@/components/Icons/Icons';
import * as O from 'fp-ts/Option';
import css from './balans.module.css';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import { pipe } from 'fp-ts/lib/function';
import { Balance } from '../../whalet.view-model';

export interface BalansProps {
    balance: O.Option<Balance>;
}

export const Balans = ({ balance }: BalansProps) => {
    return (
        <div className={'app-container ' + css.wrap}>
            <div className={css.labelWrap}>
                <span className={css.label}>Current balance</span>
                <div className={css.alert}>
                    {/* TODO: по какому принципу появляется оранжевый кружок */}
                    <AlertIcon />
                </div>
            </div>
            <div className={css.balans}>
                <OptionSpan
                    modificator="$"
                    data={pipe(
                        balance,
                        O.map((x) => x.int)
                    )}
                />
                <OptionSpan
                    data={pipe(
                        balance,
                        O.map((x) => x.float)
                    )}
                    className={css.shadow}
                />
            </div>

            {/* <div className={css.pnl}>
                <PnlArrowUpIcon className={css.icon} />
                <span className={css.val}>12.76%</span>
            </div> */}
        </div>
    );
};
