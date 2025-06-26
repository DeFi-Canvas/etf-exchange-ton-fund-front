import { injectable, token } from '@injectable-ts/core';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { Error, PENDING } from '../errors/error-system';
import { Any } from 'io-ts';

export interface CacheStore {
    get: (key: string, codec: Any) => E.Either<Error, unknown>;
    set: (key: string, data: unknown) => void;
}

export type NewCaheStore = CacheStore;

export const newNewCahe = (): NewCaheStore => {
    const set = (key: string, data: unknown) => {
        localStorage.setItem(key, JSON.stringify(data));
    };

    const get = (key: string, codec: Any) => {
        const cache = pipe(
            E.fromNullable(PENDING)(localStorage.getItem(key)),
            E.map((data) => {
                return JSON.parse(data);
            })
        );
        if (E.isRight(cache) && codec.is(cache.right)) {
            return cache;
        } else {
            localStorage.removeItem(key);
            return E.left(PENDING);
        }
    };

    return { set, get };
};

export const CacheStore = injectable('CACHE_STORE', newNewCahe);
