import { memo } from 'react';
import * as E from 'fp-ts/Either';
import { pipe } from 'fp-ts/lib/function';

type RenderEitherErrors = 'pending' | 'error' | string;
interface RenderEitherProps<Props> {
    // TODO: может ебануть
    data: E.Either<RenderEitherErrors, Props | unknown>;
    OnLoad?: () => JSX.Element;
    OnError?: () => JSX.Element;
    Component: (props: Props) => JSX.Element;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    map?: (data: any) => Props;
    // TODO: добавить маппинг ошибок вне спектра?
}

export const RenderEither = <T,>({
    data,
    OnLoad,
    OnError,
    Component,
    map,
}: RenderEitherProps<T>) => {
    const render = pipe(
        data,
        E.fold(
            (err) => {
                switch (err) {
                    case 'pending':
                        return OnLoad && <OnLoad />;
                    case 'error':
                        return OnError && <OnError />;

                    default:
                        <span>{err}</span>;
                }
            },
            (props) => {
                if (Array.isArray(props) && map) {
                    console.log('props', props);

                    //TODO: очень плохо нужно будет поменять на uuid
                    return (
                        <>
                            {props.map(map).map((props, id) => (
                                <Component {...props} key={id} />
                            ))}
                            ;
                        </>
                    );
                } else {
                    console.log('else');

                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <Component {...props} />;
                }
            }
        )
    );
    return <>{render}</>;
};

export interface RenderResultProps<E, A> {
    readonly data: E.Either<E, A>;
    readonly success: (value: A) => JSX.Element | null;
    readonly loading?: () => JSX.Element | null;
    readonly failure?: (e: E) => JSX.Element | null;
}

export interface RenderResultComponent {
    <E, A>(props: RenderResultProps<E, A>): JSX.Element | null;
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
                    return failure && failure(err);
                default:
                    return <span>error</span>;
            }
        }, success)
    );
});
