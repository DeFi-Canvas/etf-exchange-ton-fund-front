import { injectable } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EarnContainer } from './components/earn/earn.container';
import { Settings } from './components/settings/settings.component';
import { Withdraw } from './components/withdraw/withdraw.component';
import { Documentation } from './components/documentation/documentation.component';
import css from './profile.module.css';

export const ProfileContainer = injectable(
    UserInfoContainer,
    EarnContainer,
    (UserInfoContainer, EranContainer) => () => {
        return (
            <div className={css.profile}>
                <input type="text" />
                <UserInfoContainer />
                <EranContainer />
                <Settings />
                <Withdraw />
                <Documentation />
            </div>
        );
    }
);
