import {
    NotificationStatusIcon,
    TransactionStatusIcon,
} from '@/components/Icons/Icons';
import { NewToastdata } from '@/store/toaster.store';
import css from './toast-body.module.css';

export const ToastBody = ({ status, title, subTitle }: NewToastdata) => {
    return (
        <div className={css.wrap}>
            <div className={css.icon}>
                <NotificationStatusIcon status={status} />
            </div>
            <div className={css.textWrap}>
                <span className={css.title}>{title}</span>
                <span className={css.text}>{subTitle}</span>
            </div>
        </div>
    );
};
