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
                console.log(props);

                if (Array.isArray(props) && map) {
                    return props.map((el, id) => {
                        const currentProps = map(el);
                        //TODO: очень плохо нужно будет поменять на uuid
                        return <Component {...currentProps} key={id} />;
                    });
                } else {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    return <Component {...props} />;
                }
            }
        )
    );
    return render;
};
