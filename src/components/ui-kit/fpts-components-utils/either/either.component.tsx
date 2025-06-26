import { memo } from 'react';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';
import { PENDING, ERROR, Error } from '@/store/errors/error-system';

export interface RenderResultProps<E extends Error, A> {
    readonly data: E.Either<E, A>;
    readonly success: (value: A) => JSX.Element | null;
    readonly loading?: () => JSX.Element | null;
    readonly failure?: (e: E) => JSX.Element | null;
}

export interface RenderResultComponent {
    <E extends Error, A>(props: RenderResultProps<E, A>): JSX.Element | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const RenderResult: RenderResultComponent = memo((props) => {
    const { data, success, failure, loading } = props;

    return pipe(
        data,
        E.fold((err) => {
            switch (err) {
                case PENDING:
                    return loading && loading();
                case ERROR:
                default:
                    return failure && failure(err);
            }
        }, success)
    );
});
