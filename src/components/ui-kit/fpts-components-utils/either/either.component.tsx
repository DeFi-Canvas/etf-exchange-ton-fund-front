import { memo } from 'react';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

type RenderEitherErrors = 'pending' | 'error' | string;

export interface RenderResultProps<E extends RenderEitherErrors, A> {
    readonly data: E.Either<E, A>;
    readonly success: (value: A) => JSX.Element | null;
    readonly loading?: () => JSX.Element | null;
    readonly failure?: (e: E) => JSX.Element | null;
}

export interface RenderResultComponent {
    <E extends RenderEitherErrors, A>(
        props: RenderResultProps<E, A>
    ): JSX.Element | null;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
export const RenderResult: RenderResultComponent = memo((props) => {
    const { data, success, failure, loading } = props;

    return pipe(
        data,
        E.fold((err) => {
            switch (err) {
                case 'pending':
                    return loading && loading();
                case 'error':
                default:
                    return failure && failure(err);
            }
        }, success)
    );
});
