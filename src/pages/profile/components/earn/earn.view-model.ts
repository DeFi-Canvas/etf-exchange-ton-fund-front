import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { newProfileRestService } from '@/API/profile-service';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { tap } from '@most/core';

export interface EranStep {
    readonly id: string;
    readonly title: string;
    readonly reward: number;
    readonly isActive: boolean;
    readonly externalLink?: string;
}

export interface EranViewModel {
    readonly steps: Property<E.Either<string, Array<EranStep>>>;
}

export interface NewEranViewModel {
    (): ValueWithEffect<EranViewModel>;
}

export const newEranViewModel = injectable(
    newProfileRestService,
    (service): NewEranViewModel =>
        () => {
            const steps = newLensedAtom<E.Either<string, Array<EranStep>>>(
                E.left('pending')
            );

            const getStepsEffect = pipe(service.getTask(), tap(steps.set));
            return valueWithEffect.new(
                {
                    steps,
                },
                getStepsEffect
            );
        }
);
