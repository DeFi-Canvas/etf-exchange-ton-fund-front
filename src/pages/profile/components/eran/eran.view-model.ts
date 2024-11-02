import { injectable, token } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { UserStoreService } from '@/store/user.store';

export interface EranStep {
    readonly id: number;
    readonly title: string;
    readonly reward: string;
    readonly isActive: boolean;
    readonly externalLink?: string;
}

export interface EranViewModel {
    readonly steps: Property<Array<EranStep>>;
}

export interface NewEranViewModel {
    (): ValueWithEffect<EranViewModel>;
}

// TODO получать состояние с userStore
const stepsInit: Array<EranStep> = [
    {
        id: 0,
        title: 'Subscribe to the channel',
        reward: '+ 15 TON',
        isActive: true,
        externalLink: 'https://t.me/DeFiCanvas',
    },
    {
        id: 1,
        title: 'Take the survey',
        reward: '+ 0,35 TON',
        isActive: true,
        externalLink:
            'https://docs.google.com/forms/d/e/1FAIpQLSfUII2pvn7yHji8Htz81Sz0DYh2VaS4IW8lFkBYVYq2IVM0nA/viewform',
    },
];

export const newEranViewModel = injectable(
    token('userStore')<UserStoreService>(),
    (userStore): NewEranViewModel =>
        () => {
            const steps = newLensedAtom<Array<EranStep>>(stepsInit);
            return valueWithEffect.new({
                steps,
            });
        }
);
