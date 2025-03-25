import { NewToastdata } from '@/store/toaster.store';

import cn from 'classnames';
import css from './notifications.module.css';
import { NotificationStatusIcon } from '@/components/Icons/Icons';

interface NotificationUI {
    date: string;
    body: Array<NewToastdata>;
}

interface NotificationsProps {
    notifications: Array<NotificationUI>;
}

export const Notifications = ({ notifications }: NotificationsProps) => {
    return (
        <div className={cn(css.wrap)}>
            <span className={css.title}>Notifications</span>
            <div className={css.notificationsWrap}>
                {notifications.map(({ date, body }) => (
                    <div>
                        <span className={css.date}>{date}</span>
                        <div className={css.notificationWrap}>
                            {body.map(NotificationsBody)}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const NotificationsBody = ({ status, title, subTitle }: NewToastdata) => {
    return (
        <div className={css.notification}>
            <NotificationStatusIcon status={status} className={css.svg} />
            <div className={css.info}>
                <span className={css.title}>{title}</span>
                <span>{subTitle}</span>
            </div>
        </div>
    );
};
