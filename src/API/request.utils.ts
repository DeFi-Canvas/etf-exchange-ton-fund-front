import { fromPromise } from '@most/core';
import { pipe } from 'fp-ts/lib/function';
import { AxiosResponse } from 'axios';
import { either } from 'fp-ts';
import { Stream } from '@most/types';
import { Either, fold } from 'fp-ts/lib/Either';
import { ArrayType, Mixed, Props, TypeC } from 'io-ts';
import * as t from 'io-ts';
import { PathReporter } from 'io-ts/lib/PathReporter';

export const getRequestGenerated =
    <P extends Props, C extends Mixed, ReturnType>(
        req: Promise<AxiosResponse<unknown, unknown>>,
        shema: TypeC<P> | ArrayType<C>,
        map?: (data: t.TypeOf<typeof shema>) => ReturnType,
        validation?: (
            data: t.TypeOf<typeof shema>
        ) => Either<string, unknown> | undefined
    ) =>
    <T>(): Stream<Either<string, T>> => {
        const stream: Stream<Either<string, T>> = fromPromise(
            req.then(({ data }) => {
                return pipe(
                    data,
                    shema.decode,
                    fold(
                        () => {
                            console.error(
                                'ALAAAAAARM Errors:',
                                PathReporter.report(shema.decode(data))
                            );
                            return either.left('error');
                        },
                        (data) => {
                            const validData = validation && validation(data);
                            if (validData) {
                                return validData;
                            }
                            if (!map) {
                                return either.of(data);
                            }
                            if (Array.isArray(data)) {
                                return either.of(data.map(map));
                            } else {
                                return either.of(map(data));
                            }
                        }
                    )
                );
            })
        );
        return stream;
    };
