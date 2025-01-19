import css from './transaction-view.module.css';
import { TransactionStatusIcon } from '@/components/Icons/Icons.tsx';
import AppFooter from '@/components/app-footer/app-footer.components.tsx';
import AppButton from '@/components/app-button/app-button.component.tsx';
import cn from 'classnames';
import { getUuid } from '@/utils/uuid.ts';
import { TransactionResponse } from '@pages/transaction-view/transaction-view.model.ts';

const classNameByStatus = {
    SUCCESS: css.colorGreen,
    PROCESSING: css.colorYellow,
    ERROR: css.colorRed,
    GIFT: css.colorPurple,
};

/*
 * TODO:
 *
 * response: {
 *     transactionStatus:  'SUCCESS' | 'PROCESSING' | 'ERROR' | 'GIFT'
 *     transactionType: 'BUY' | 'DEPOSIT' | 'WITHDRAW' | 'SWAP' | 'MULTI-SWAP' | 'SELL' | 'ERROR' | 'PROCESSING',
 *     amount: number,
 *     coinName: string,
 *     blockchainLink: string,
 *     data: { name: string; value: string }[];
 * }
 *
 * */
// TODO: MOCK
const data: TransactionResponse = {
    status: 'SUCCESS',
    type: 'DEPOSIT',
    amount: 1324.9,
    coinName: 'TON',
    blockchainLink: '#',
    data: [
        { name: 'Network', value: 'TON' },
        { name: 'Date', value: '09.11.2024, 13:12:31' },
        {
            name: 'From',
            value: 'EQDD8dqOzaj4zUK6ziJOo_G2lx6qf1TEktTRkFJ7T1c_fPQb',
        },
        {
            name: 'TXID',
            value: '223007f7b5cfd9bdea4a6bdac17fd4b2b1d52c67d60084c0726aa1cb2dfb5741',
        },
    ],
};

export const TransactionView = () => {
    const [amount, remains] = ('' + data.amount).split('.');

    const signForAmount = Math.sign(data.amount) < 0 ? '-' : '+';
    const amountText = `${signForAmount} ${Math.abs(Number(amount))}`;
    // const remainsText = Number(remains) > 9 ? remains : `0${remains}`;

    const hasRemains = Number(remains) > 0;
    let remainsText = '';

    if (hasRemains) {
        remainsText = remains.length === 1 ? `${remains}0` : remains;
    }

    return (
        <div className={css.page}>
            <header className={css.pageHeader}>
                <div className={css.amount}>
                    <span>{amountText}</span>
                    {hasRemains && (
                        <span className={css.remains}>{`,${remainsText}`}</span>
                    )}
                </div>
                <div className={css.coinName}>{data.coinName}</div>
                <div className={css.status}>
                    <TransactionStatusIcon status={data.type} />
                    <span className={classNameByStatus[data.status]}>
                        Deposit successful
                    </span>
                </div>
            </header>
            <div className={cn('app-container', css.infoCard)}>
                {data.data.map((item) => (
                    <div key={getUuid()} className={css.infoItem}>
                        <div className={css.infoItemName}>{item.name}</div>
                        <div className={css.infoItemValue}>{item.value}</div>
                    </div>
                ))}
            </div>
            <AppFooter>
                <AppButton
                    label="View in blockchain"
                    type="secondary"
                    to={data.blockchainLink}
                />
            </AppFooter>
        </div>
    );
};
