import { DepositI18n } from '@/pages/deposit/deposit.i18n.model';

export const Deposit: DepositI18n = {
    Deposit: {
        title: 'Депозит',
    },
    EndPoint: {
        title: (ticker, css) => (
            <>
                Send only&nbsp;
                <span className={css.bold}>{ticker}</span>
                &nbsp;via&nbsp;
                <span className={css.bold}>TON</span>&nbsp;to this address.
                Other coins, jettons and NFTs will be permanently lost.
                <span className={css.bold}>
                    Memo is mandatory to make a deposit!
                </span>
            </>
        ),
        address: 'Адрес для депозита',
        tag: 'Гет/Мемо',
        button: 'Завершить',
    },
};
