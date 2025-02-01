import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';

import { toast } from 'react-toastify';

export interface ToastifyStoreService {
    emmitToast: (data: string) => void;
}

export type NewToastifyStoreService = ValueWithEffect<ToastifyStoreService>;

export const newToastifyStoreService = (): NewToastifyStoreService => {
    const emmitToast = (data: string) => toast(data);

    return valueWithEffect.new({
        emmitToast,
    });
};
