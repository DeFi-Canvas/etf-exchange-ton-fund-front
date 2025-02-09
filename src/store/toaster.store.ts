import { ToastBody } from '@/components/toastify-components/toast-body/toast-body.component';
import { TransactionStatus } from '@/pages/whalet/components/transaction/types';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';

import { toast } from 'react-toastify';

export interface NewToastdata {
    status: TransactionStatus;
    title: string;
    subTitle: string;
}

export interface ToastifyStoreService {
    emmitToast: (data: NewToastdata) => void;
}

export type NewToastifyStoreService = ValueWithEffect<ToastifyStoreService>;

export const newToastifyStoreService = (): NewToastifyStoreService => {
    const emmitToast = (data: NewToastdata) => toast(ToastBody(data));

    return valueWithEffect.new({
        emmitToast,
    });
};
