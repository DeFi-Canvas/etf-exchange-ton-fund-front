import { ProfileI18n } from '@/pages/profile/profile.i18n.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { Profile as ProfileEnLocalization } from './translations/en/profile';
import { Profile as ProfileRuLocalization } from './translations/ru/profile';
import { Wallet as WalletEnLocalization } from './translations/en/wallet';
import { Wallet as WalletRuLocalization } from './translations/ru/wallet';
import { WhatToBuy as WhatToBuyEnLocalization } from './translations/en/what-to-buy';
import { WhatToBuy as WhatToBuyRuLocalization } from './translations/ru/what-to-buy';
import { Swap as SwapRuLocalization } from './translations/ru/swap';
import { Swap as SwapEnLocalization } from './translations/en/swap';
import { Withdrow as WithdrawEnLocalization } from './translations/en/withdrow';
import { Withdraw as WithdrawRuLocalization } from './translations/ru/withdrow';
import { Deposit as DepositRuLocalization } from './translations/ru/deposit';
import { Deposit as DepositEnLocalization } from './translations/en/deposit';
import { Asset as AssetEnLocalization } from './translations/en/asset';
import { Asset as AssetRuLocalization } from './translations/ru/asset';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';
import { WalletI18n } from '@/pages/whalet/wallet.i18n.model';
import { WhatToBuyI18n } from '@/pages/what-to-buy/what-to-buy.i18n.model';
import { SwapI18n } from '@/pages/swap/swap.i18n';
import { WithdrawI18n } from '@/pages/withdrow/withdeow.i18n.model';
import { DepositI18n } from '@/pages/deposit/deposit.i18n.model';
import { AssetI18n } from '@/pages/assets-single/asset.i18n.model';

export type Locale = 'en' | 'ru';
export interface I18NService {
    locale: Property<Locale>;
    setLocale: (locale: Locale) => void;
    Profile: Property<ProfileI18n>;
    Wallet: Property<WalletI18n>;
    WhatToBuy: Property<WhatToBuyI18n>;
    Swap: Property<SwapI18n>;
    Withdraw: Property<WithdrawI18n>;
    Deposit: Property<DepositI18n>;
    Asset: Property<AssetI18n>;
}

// TODO:  AssetPage

export type NewI18NService = ValueWithEffect<I18NService>;

export const newNewI18NService = (): NewI18NService => {
    const locale = newLensedAtom<Locale>('en');
    const Profile = newLensedAtom<ProfileI18n>(ProfileEnLocalization);
    const Wallet = newLensedAtom<WalletI18n>(WalletEnLocalization);
    const WhatToBuy = newLensedAtom<WhatToBuyI18n>(WhatToBuyEnLocalization);
    const Swap = newLensedAtom<SwapI18n>(SwapEnLocalization);
    const Withdraw = newLensedAtom<WithdrawI18n>(WithdrawEnLocalization);
    const Deposit = newLensedAtom<DepositI18n>(DepositEnLocalization);
    const Asset = newLensedAtom<AssetI18n>(AssetEnLocalization);

    const changeLocaleEffect = pipe(
        locale,
        fromProperty,
        tap((locale) => {
            switch (locale) {
                case 'en': {
                    Profile.set(ProfileEnLocalization);
                    Wallet.set(WalletEnLocalization);
                    WhatToBuy.set(WhatToBuyEnLocalization);
                    Swap.set(SwapEnLocalization);
                    Withdraw.set(WithdrawEnLocalization);
                    Deposit.set(DepositEnLocalization);
                    Asset.set(AssetEnLocalization);
                    return;
                }
                case 'ru': {
                    Profile.set(ProfileRuLocalization);
                    Wallet.set(WalletRuLocalization);
                    WhatToBuy.set(WhatToBuyRuLocalization);
                    Swap.set(SwapRuLocalization);
                    Withdraw.set(WithdrawRuLocalization);
                    Deposit.set(DepositRuLocalization);
                    Asset.set(AssetRuLocalization);
                    return;
                }
            }
        })
    );

    return valueWithEffect.new(
        {
            locale,
            setLocale: locale.set,
            Profile,
            Wallet,
            WhatToBuy,
            Swap,
            Withdraw,
            Deposit,
            Asset,
        },
        changeLocaleEffect
    );
};
