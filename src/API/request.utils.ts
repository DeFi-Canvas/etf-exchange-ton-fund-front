import { fromPromise } from '@most/core';
import { pipe } from 'fp-ts/lib/function';
import { AxiosResponse, type RawAxiosRequestConfig } from 'axios';
import { either } from 'fp-ts';
import { Stream } from '@most/types';
import { Either, fold } from 'fp-ts/lib/Either';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';
import { retrieveLaunchParams } from '@telegram-apps/sdk-react';

export const getRequestGenerated =
    <ReturnType, A, O = A, I = unknown>(
        req: Promise<AxiosResponse<unknown, unknown>>,
        // shema: TypeC<P> | ArrayType<C> ,
        shema: t.Type<A, O, I>,
        map?: (data: t.TypeOf<typeof shema>) => ReturnType,
        validation?: (
            data: t.TypeOf<typeof shema>
        ) => Either<string, unknown> | undefined
    ) =>
    <T>(): Stream<Either<string, T>> => {
        const stream: Stream<Either<string, T>> = fromPromise(
            req
                .then(({ data }) => {
                    return pipe(
                        data as I,
                        shema.decode,
                        fold(
                            () => {
                                console.error(
                                    'ALAAAAAARM Errors:',
                                    { data },
                                    PathReporter.report(shema.decode(data as I))
                                );
                                return either.left('error');
                            },
                            (data) => {
                                const validData =
                                    validation && validation(data);
                                if (validData) {
                                    return validData;
                                }
                                if (!map) {
                                    return either.of(data);
                                }
                                return either.of(map(data));
                            }
                        )
                    );
                })
                .catch((data) => {
                    console.error(
                        'ALAAAAAARM Errors:',
                        { data },
                        PathReporter.report(shema.decode(data))
                    );
                    return either.left('network err');
                })
        );
        return stream;
    };

export const authRequestOptions = (): RawAxiosRequestConfig => {
    const { initDataRaw } = retrieveLaunchParams();

    return {
        headers: {
            Authorization: `tma ${initDataRaw}`,
        },
    };
};
