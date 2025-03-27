import { WithdrawI18n } from '@/pages/withdrow/withdeow.i18n.model';

export const Withdraw: WithdrawI18n = {
    Withdraw: {
        title: 'Вывод',
    },
    Amount: {
        title: 'Введите количество',
        balance: 'Доступный баланс',
        button: {
            empty: 'Введите количество',
            normal: 'Продолжить',
        },
        errors: {
            insufficientBalance: 'Недостаток баланса',
            minimumAmount: 'Минимальное количество',
        },
    },
    Address: {
        title: 'Введите количество',
        address: 'Адрес вывода',
        placeholderAddress:
            'Введите или нажмите и удерживайте, чтобы вставить адрес для вывода средств.',
        tag: 'Тег/Мемо',
        placeholderTag: 'Введите Тег',
        commission: 'Комиссия',
        footer: {
            balance: 'Баланс после вывода',
            button: 'Продолжить',
        },
    },
    Check: {
        title: 'Проверьте данные',
        address: 'Адрес вывода',
        tag: 'Тег/Мемо',
        commission: 'Комиссия',
        footer: {
            balance: 'Баланс после вывода',
            button: 'Подтвердить и вывести',
        },
    },
    Final: {
        title: 'Вывод совершается',
        description:
            'Ваша транзакция обрабатывается. Вы можете отслеживать статус в разделе «Транзакции».',
            ammount: (amount: number, currency: string) =>
                `Сумма ${amount} ${currency} была отправлена на адрес:`,
        view: 'Посмотреть транзакцию',
        finish: 'Завершить',
    },
};
