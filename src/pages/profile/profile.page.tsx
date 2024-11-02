import { injectable } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EarnContainer } from './components/earn/earn.container';
import { Settings } from './components/settings/settings.component';

export const Profile = injectable(
    UserInfoContainer,
    EarnContainer,
    // eslint-disable-next-line react/display-name
    (UserInfoContainer, EranContainer) => () => {
        return (
            <div>
                <UserInfoContainer />
                <EranContainer />
                <Settings />
            </div>
        );
    }
);
