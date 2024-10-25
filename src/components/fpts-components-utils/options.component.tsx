import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

export interface OptionSpanProps {
    data: O.Option<string>;
    modificator?: string;
    className?: string;
}

export const OptionSpan = ({
    data,
    className,
    modificator,
}: OptionSpanProps) => {
    return (
        <span className={className}>
            {modificator}{' '}
            {pipe(
                data,
                O.getOrElse(() => '-')
            )}
        </span>
    );
};
