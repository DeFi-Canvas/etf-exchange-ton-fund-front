import { FC, CSSProperties } from 'react';
import css from './user-avatar.module.css';
import { trackTelemetree } from '@/telemetree/telemetree-entry';
import { useTWAEvent } from '@tonsolutions/telemetree-react';

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
    const eventBuilder = useTWAEvent();

    return (
        <div
            className={css.userAvatar}
            style={styleListUserAvatar}
            onClick={() => {
                trackTelemetree(eventBuilder, 'PROFILE_PAGE: user click');
            }}
        >
            <span className={css.userAvatarLetter}>{props.userNameLetter}</span>
        </div>
    );
};

export default UserAvatar;
