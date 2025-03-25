import { ToastBody } from '@/components/toastify-components/toast-body/toast-body.component';
import { NotificationStatus } from '@/pages/notifications/notifications.model';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';

import { toast } from 'react-toastify';

export interface NewToastdata {
    status: NotificationStatus;
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
