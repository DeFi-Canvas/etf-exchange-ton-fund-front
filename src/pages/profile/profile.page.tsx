import { injectable } from '@injectable-ts/core';
import { UserInfoContainer } from './components/user-info/user-info.container';
import { EranContainer } from './components/eran/eran.container';
import { Settings } from './components/settings/settings.component';

export const Profile = injectable(
    UserInfoContainer,
    EranContainer,
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
