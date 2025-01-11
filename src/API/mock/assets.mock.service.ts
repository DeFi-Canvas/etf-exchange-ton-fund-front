import { now } from '@most/core';
import * as E from 'fp-ts/Either';

export const NEW_ASETSS_REST_SERVICE = () => ({
    getAssets: (id: string) =>
        now(
            E.right({
                id: id,
                name: '',
                ticker: '',
                category: '',
                description: '',
                image_url: '',
                price: 1,
                withdrawal_fee: 1,
            })
        ),
});
