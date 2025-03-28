import { WhatToBuyI18n } from '@/pages/what-to-buy/what-to-buy.i18n.model';

export const WhatToBuy: WhatToBuyI18n = {
    Funds: {
        title: 'Что купить',
        card: {
            risk: 'Риски',
            forecast: 'Прогноз',
            return: 'Годовая доходность',
        },
    },
    Fund: {
        tvlTitle: 'Вложено (TVL)',
        about: 'О Фонде',
        toMemeCoins: '?',
        commission: 'Комиссия',
        coinsExchangeFee: '?',
        whatsInside: "Состав",
        moreInfo: {
            title: 'Подробности',
            flow: 'Участники',
            created: 'Дата создания',
        },
        authorTitle: 'Владелец',
        sell: 'Продать',
        buy: 'Купить',
    },
    Purchase: {
        title: 'Покупка',
        attention: {
            title: 'Внимание',
            text: 'Инвестирование в фонды находится на этапе бета-тестирования. Пожалуйста, учитывайте риски.',
        },
        details: {
            title: 'Детали покупки',
            commission: 'Комиссия',
            total: 'Итого',
        },
        buy: 'Купить',
        finalBottomSheet: {
            operation: (operation: string) =>
                `${operation} успешна`,
            fund: 'фонд',
            total: 'Итого',
        },
    },
    Sell: {
        title: 'Продажа',
        details: {
            title: 'Детали продажи',
            commission: 'Комиссия',
            total: 'Итого',
        },
        finalBottomSheet: {
            operation: (operation: string) =>
                `${operation} успешна`,
            fund: 'фонд',
            total: 'Итого',
        },
    },
    utils: {
        asset: 'Актив',
        amount: 'Количество',
        max: 'макс.',
    },
};
