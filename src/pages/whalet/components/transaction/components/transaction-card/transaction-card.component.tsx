import * as O from 'fp-ts/Option';
import { pipe } from 'fp-ts/lib/function';
import { formatCapsToSepareteCamel, formatDateToStr } from '@/utils/string';
import { OptionSpan } from '@/components/ui-kit/fpts-components-utils/options.component';
import { ITransaction } from '../../types';
import { TransactionStatusIcon } from '@/components/Icons/Icons';
import cn from 'classnames';
import css from './transaction-card.module.css';
import { CSSProperties } from 'react';
import { formatNumberToUI } from '@/utils/number';

type CustomCSSProperties = CSSProperties & {
    '--color-status'?: string;
};

const styleListForStatus = (
    modificatorUI: O.Option<string>
): CustomCSSProperties => {
    const statusText = pipe(
        modificatorUI,
        O.getOrElse(() => '-')
    );

    let colorStatus = 'var(--color-text-dark)';

    if (statusText === 'Error') {
        colorStatus = 'var(--color-system-red)';
    }

    return { '--color-status': colorStatus };
};

const TransactionCard = (props: ITransaction) => {
    const typeUI = pipe(props.type, O.map(formatCapsToSepareteCamel));
    const modificatorUI = pipe(
        props.modificator,
        O.map(formatCapsToSepareteCamel)
    );
    const dateUI = pipe(props.fullDate, O.map(formatDateToStr));
    const sideModificatorUI = pipe(
        props.side,
        O.map((side) => (side === 'BUY' ? '+' : '-')),
        O.getOrElse(() => '')
    );
    const hasDescription = pipe(props.description, O.isSome);
    const Icon = () =>
        pipe(
            props.status,
            O.map((s) => (
                // eslint-disable-next-line react/jsx-key
                <TransactionStatusIcon status={s} className={css.icon} />
            )),
            O.getOrElse(() => <> </>)
        );

    return (
        <div className={css.card}>
            <div className={cn(css.cardInfo, css.cardInfoStart)}>
                <div className={css.cardInfoTitle}>
                    <OptionSpan data={typeUI} />
                    &nbsp;
                    {hasDescription && <OptionSpan data={props.description} />}
                </div>
                <div className={css.statusDateWrapper}>
                    <Icon />
                    <OptionSpan data={dateUI} />
                </div>
            </div>
            <div className={cn(css.cardInfo, css.cardInfoEnd)}>
                <div
                    className={css.price}
                    style={styleListForStatus(modificatorUI)}
                >
                    <OptionSpan
                        modificator={sideModificatorUI}
                        data={pipe(props.amount, O.map(formatNumberToUI))}
                    />
                    <OptionSpan data={props.currency} />
                </div>
                <div className={css.status}>
                    <OptionSpan data={modificatorUI} />
                </div>
            </div>
        </div>
    );
};

export default TransactionCard;
