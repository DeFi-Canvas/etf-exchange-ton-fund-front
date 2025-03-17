import { ProfileI18n } from '@/pages/profile/profile.i18n.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { Property } from '@frp-ts/core';
import { newLensedAtom } from '@frp-ts/lens';
import { Profile as ProfileEnLocalization } from './translations/en/profile';
import { Profile as ProfileRuLocalization } from './translations/ru/profile';
import { Wallet as WalletEnLocalization } from './translations/en/wallet';
import { Wallet as WalletRuLocalization } from './translations/ru/wallet';
import { pipe } from 'fp-ts/lib/function';
import { fromProperty } from '@/utils/property.utils';
import { tap } from '@most/core';
import { WalletI18n } from '@/pages/whalet/wallet.i18n.model';

export type Locale = 'en' | 'ru';
export interface I18NService {
    locale: Property<Locale>;
    setLocale: (locale: Locale) => void;
    Profile: Property<ProfileI18n>;
    Wallet: Property<WalletI18n>;
}

export type NewI18NService = ValueWithEffect<I18NService>;

export const newNewI18NService = (): NewI18NService => {
    const locale = newLensedAtom<Locale>('ru');
    const Profile = newLensedAtom<ProfileI18n>(ProfileEnLocalization);
    const Wallet = newLensedAtom<WalletI18n>(WalletEnLocalization);

    const changeLocaleEffect = pipe(
        locale,
        fromProperty,
        tap((locale) => {
            switch (locale) {
                case 'en': {
                    Profile.set(ProfileEnLocalization);
                    Wallet.set(WalletEnLocalization);
                    return;
                }
                case 'ru': {
                    Profile.set(ProfileRuLocalization);
                    Wallet.set(WalletRuLocalization);
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
        },
        changeLocaleEffect
    );
};
