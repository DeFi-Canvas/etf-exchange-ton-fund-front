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
    // eslint-disable-next-line react/display-name
    (UserInfoContainer, EranContainer) => () => {
        return (
            <div className={css.profile}>
                <UserInfoContainer />
                <EranContainer />
                <Settings />
                <Withdraw />
                <Documentation />
            </div>
        );
    }
);
