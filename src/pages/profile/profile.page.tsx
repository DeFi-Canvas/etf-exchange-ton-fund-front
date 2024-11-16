import { injectable } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EarnContainer } from './components/earn/earn.container';
import { Settings } from './components/settings/settings.component';
import { Withdraw } from './components/withdraw/withdraw.component';
import css from './profile.module.css';

export const ProfileContainer = injectable(
    UserInfoContainer,
    EarnContainer,
    // eslint-disable-next-line react/display-name
    (UserInfoContainer, EranContainer) => () => {
        return (
            <div className={ css.profile } >
                <UserInfoContainer />
                <EranContainer />
                <Settings />
                <Withdraw />

                
                <div className={css.gitPages}>
                    <a
                        href="https://holstby.github.io/etf-exchange-ton-fund-gitbook/docs/introduction.html"
                        target="_blank"
                        rel="noreferrer"
                    >
                        Documentation
                    </a>
                </div>
            </div>
        );
    }
);
