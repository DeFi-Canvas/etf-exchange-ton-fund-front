import { pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/Option';

export const mapNumberOptionToUI = (o: O.Option<number>) =>
    pipe(
        o,
        O.map((val) => `${val}`)
    );
