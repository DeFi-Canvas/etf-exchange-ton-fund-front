import { injectable } from '@injectable-ts/core';
import { Property } from '@frp-ts/core';
import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { newLensedAtom } from '@frp-ts/lens';
import { newProfileRestService } from '@/API/profile.service';
import * as E from 'fp-ts/Either';
import { flow, pipe } from 'fp-ts/lib/function';
import { chain, tap } from '@most/core';
import { createAdapter } from '@most/adapter';

export interface EranStep {
    readonly id: string;
    readonly title: string;
    readonly reward: number;
    readonly isActive: boolean;
    readonly externalLink?: string;
    readonly isLoading: boolean;
}

export interface EranViewModel {
    readonly steps: Property<E.Either<string, Array<EranStep>>>;
    readonly checkStep: (id: string) => void;
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

            const [checkStep, checkStepEvent] = createAdapter<string>();

            const getStepsEffect = pipe(service.getTask(), tap(steps.set));
            const checkStepEffect = pipe(
                checkStepEvent,
                tap((id) => {
                    steps.modify(
                        flow(
                            E.map((steps) =>
                                steps.map((el) => {
                                    if (el.id === id) {
                                        return {
                                            ...el,
                                            isLoading: true,
                                        };
                                    } else {
                                        return el;
                                    }
                                })
                            )
                        )
                    );
                }),
                chain(service.checkTask),
                tap((data) => {
                    steps.modify(
                        flow(
                            E.map((steps) =>
                                steps.map((el) => {
                                    if (el.id === data.id) {
                                        return {
                                            ...el,
                                            isActive: data.success,
                                            isLoading: false,
                                        };
                                    } else {
                                        return el;
                                    }
                                })
                            )
                        )
                    );
                })
            );

            return valueWithEffect.new(
                {
                    steps,
                    checkStep,
                },
                getStepsEffect,
                checkStepEffect
            );
        }
);
