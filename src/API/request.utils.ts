import { fromPromise } from '@most/core';
import { pipe } from 'fp-ts/lib/function';
import axios from 'axios';
import { either } from 'fp-ts';
import { Stream } from '@most/types';
import { Either } from 'fp-ts/lib/Either';

export const getRequest =
    <GetType, ReturnType>(
        url: string,
        map?: (data: GetType) => ReturnType,
        validation?: (data: GetType) => Either<string, GetType> | undefined
    ) =>
    <T>(): Stream<Either<string, T>> => {
        const stream: Stream<Either<string, T>> = pipe(
            fromPromise(
                axios
                    .get<GetType>(url)
                    .then(({ data }) => {
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
                    })
                    .catch((error) => {
                        return either.left(
                            `Something goes wrong status = ${error.response.status}`
                        );
                    })
            )
        );
        return stream;
    };
