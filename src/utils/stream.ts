import { CacheStore } from '@/store/cache/cahe.store';
import { throttle, startWith, tap } from '@most/core';
import { constVoid, flow, pipe } from 'fp-ts/lib/function';
import * as E from 'fp-ts/lib/Either';
import { Any } from 'io-ts';

export const waitWithCache = (
    store: CacheStore,
    cacheKey: string,
    codec: Any
) =>
    flow(
        throttle(500),
        startWith(store.get(cacheKey, codec)),
        tap((x) => {
            pipe(
                x,
                E.fold(constVoid, (t) => store.set(cacheKey, t))
            );
        })
    );
