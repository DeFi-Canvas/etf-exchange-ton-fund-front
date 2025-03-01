import { injectable } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EarnContainer } from './components/earn/earn.container';
import { Settings } from './components/settings/settings.component';
import { Withdraw } from './components/withdraw/withdraw.component';
import { Documentation } from './components/documentation/documentation.component';
import css from './profile.module.css';
import { memo } from 'react';

export const ProfileContainer = injectable(
    UserInfoContainer,
    EarnContainer,
    (UserInfoContainer, EranContainer) =>
        memo(() => {
            return (
                <div className={css.profile}>
                    <UserInfoContainer />
                    <EranContainer />
                    <Settings />
                    <Withdraw />
                    <Documentation />
                </div>
            );
        })
);
