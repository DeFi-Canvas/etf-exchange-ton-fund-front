import { DepositI18n } from '@/pages/deposit/deposit.i18n.model';

export const Deposit: DepositI18n = {
    Deposit: {
        title: 'Deposit',
    },
    EndPoint: {
        title: (ticker, css) => (
            <>
                Send only&nbsp;
                <span className={css.bold}>{ticker}</span>
                &nbsp;via&nbsp;
                <span className={css.bold}>TON</span>&nbsp;to this address.
                Other assets will be lost. <br />
                <span className={css.bold}>
                    Memo is mandatory to make a deposit!
                </span>
            </>
        ),
        address: 'Deposit address',
        tag: 'Tag/Memo (Comment/Note)',
        button: 'Finish',
    },
};
