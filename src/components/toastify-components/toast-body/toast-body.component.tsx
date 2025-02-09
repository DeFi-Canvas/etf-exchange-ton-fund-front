import { TransactionStatusIcon } from '@/components/Icons/Icons';
import { NewToastdata } from '@/store/toaster.store';

export const ToastBody = ({ status, title, subTitle }: NewToastdata) => {
    return (
        <div>
            <TransactionStatusIcon status={status} />
            <span>{title}</span>
            <span>{subTitle}</span>
        </div>
    );
};
