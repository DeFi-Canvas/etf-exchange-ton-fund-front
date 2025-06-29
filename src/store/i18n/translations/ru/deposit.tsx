import { DepositI18n } from '@/pages/deposit/deposit.i18n.model';

export const Deposit: DepositI18n = {
    Deposit: {
        title: 'Депозит',
    },
    EndPoint: {
        title: (ticker, css) => (
            <>
                Отправляйте только&nbsp;
                <span className={css.bold}>{ticker}</span>
                &nbsp;через&nbsp;
                <span className={css.bold}>TON</span>&nbsp;по этому адресу.
                Другие монеты, утеряны. <br />
                <span className={css.bold}>
                    Memo обязателен для внесения депозита!
                </span>
            </>
        ),
        address: 'Адрес для депозита',
        tag: 'Гет/Мемо',
        button: 'Завершить',
    },
};
