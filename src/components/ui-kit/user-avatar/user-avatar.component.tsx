import { FC, CSSProperties } from 'react';
import css from './user-avatar.module.css';
import { trackMixpanel } from '@/mixpanel/mixpanel-entry';

type CustomCSSProperties = CSSProperties & {
    '--size'?: string;
};

interface UserAvatarProps {
    userNameLetter: string;
    size?: number;
}

const UserAvatar: FC<UserAvatarProps> = (props) => {
    const DEFAULT_SIZE = 40;

    const styleListUserAvatar: CustomCSSProperties = {
        '--size': `${props?.size ?? DEFAULT_SIZE}px`,
    };

    return (
        <div
            className={css.userAvatar}
            style={styleListUserAvatar}
            onClick={() => {
                trackMixpanel('PROFILE_PAGE: user click');
            }}
        >
            <span className={css.userAvatarLetter}>{props.userNameLetter}</span>
        </div>
    );
};

export default UserAvatar;
