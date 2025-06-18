import { CacheStore } from '@/store/cache/cahe.store';
import { throttle, startWith, tap } from '@most/core';
import { constVoid, flow, pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';

export const waitWithCache = (store: CacheStore, cacheKey: string) =>
    flow(
        throttle(500),
        startWith(store.get(cacheKey)),
        tap((x) => {
            pipe(
                x,
                E.fold(constVoid, (t) => store.set(cacheKey, t))
            );
        })
    );
