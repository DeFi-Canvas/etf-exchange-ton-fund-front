import { now } from '@most/core';
import * as E from 'fp-ts/lib/Either';
import { WithdrawRestService } from '../withdraw.service';

export const NEW_WITHDROW_SERVICE = (): WithdrawRestService => {
    return {
        withdraw: (data) =>
            now(
                E.right({
                    status: true,
                    message: `${9} : ${data.asset} ${data.address}`,
                    transaction: 'transaction',
                })
            ),
    };
};
