import { AlertIcon } from '@/components/Icons/Icons';
import * as O from 'fp-ts/Option';
import css from './balans.module.css';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import { pipe } from 'fp-ts/lib/function';
import { Balance } from '../../whalet.view-model';
import cn from 'classnames';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';
import { useNavigate } from 'react-router-dom';

export interface BalansProps {
    balance: O.Option<Balance>;
}

export const Balans = ({ balance }: BalansProps) => {
    const eventBuilder = useTWAEvent();
    const navigate = useNavigate();

    return (
        <div className={cn('app-container', css.wrap)}>
            <div className={css.labelWrap}>
                <span className={css.label}>Current balance</span>
                <div
                    className={css.alert}
                    onClick={() => {
                        trackTelemetree(
                            eventBuilder,
                            'WALLET_PAGE: notification button click'
                        );
                    }}
                >
                    {/* TODO: по какому принципу появляется оранжевый кружок */}
                    <div onClick={() => navigate('notifications')}>
                        <AlertIcon />
                    </div>
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
