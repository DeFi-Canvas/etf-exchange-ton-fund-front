import { injectable, token } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EarnContainer } from './components/earn/earn.container';
import { Settings } from './components/settings/settings.component';
import { Withdraw } from './components/withdraw/withdraw.component';
import { Documentation } from './components/documentation/documentation.component';
import css from './profile.module.css';
import { memo } from 'react';
import { useProperty } from '@frp-ts/react';
import { I18NService } from '@/store/i18n/i18.store';

export const ProfileContainer = injectable(
    UserInfoContainer,
    EarnContainer,
    token('i18n')<I18NService>(),
    (UserInfoContainer, EranContainer, i18n) =>
        memo(() => {
            const i18nText = useProperty(i18n.Profile);
            const locale = useProperty(i18n.locale);
            return (
                <div className={css.profile}>
                    <UserInfoContainer />
                    {/* <EranContainer /> */}
                    <Settings
                        i18nText={i18nText}
                        setLocale={i18n.setLocale}
                        locale={locale}
                    />
                    <Withdraw i18nText={i18nText} />
                    <Documentation />
                </div>
            );
        })
);
