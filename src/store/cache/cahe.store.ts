import { valueWithEffect, ValueWithEffect } from '@/utils/run-view-model.utils';
import { token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { Errors, PENDING } from '../errors/erorr-systrm';

export interface CaheStore {
    get: (key: string) => E.Either<Errors, unknown>;
    set: (key: string, data: unknown) => void;
}

export type NewCaheStore = ValueWithEffect<CaheStore>;

export const newNewCahe = (): NewCaheStore => {
    const set = (key: string, data: unknown) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const get = (key: string) => {
        return pipe(
            E.fromNullable(PENDING)(localStorage.getItem(key)),
            E.map((data) => {
                return JSON.parse(data);
            })
        );
    };

    return valueWithEffect.new({ set, get });
};

export const CaheStore = token('caheStore')<CaheStore>();
