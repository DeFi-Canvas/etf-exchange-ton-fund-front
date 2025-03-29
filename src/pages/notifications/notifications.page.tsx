import { NewToastdata } from '@/store/toaster.store';

import cn from 'classnames';
import css from './notifications.module.css';
import { NotificationStatusIcon } from '@/components/Icons/Icons';
import * as E from 'fp-ts/Either';
import { RenderResult } from '@/components/ui-kit/fpts-components-utils/either/either.component';
import { NotificationUI } from './notifications.model';

interface NotificationsProps {
    notifications: E.Either<string, Array<NotificationUI>>;
}

export const Notifications = ({ notifications }: NotificationsProps) => {
    console.log(notifications);

    return (
        <div className={cn(css.wrap)}>
            <span className={css.title}>Notifications</span>
            <div className={css.notificationsWrap}>
                <RenderResult
                    data={notifications}
                    failure={(e) => <div>EMPTY</div>}
                    success={(notifications) => (
                        <>
                            {notifications.map(({ date, body }) => (
                                <div>
                                    <span className={css.date}>{date}</span>
                                    <div className={css.notificationWrap}>
                                        {body.map(NotificationsBody)}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}
                />
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
