import React, { memo } from 'react';
import { Footer } from './footer.component';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';

export const FooterContainer = injectable(
    token('withdrowStore')<WithdrowStore>(),
    (store) =>
        memo(() => {
            const currency = useProperty(store.currency);
            const balanceAfter = useProperty(store.balanceAfter);
            const symbolLogo = useProperty(store.symbolLogo);

            const onWithdrow = store.onWithdrow;

            return React.createElement(Footer, {
                balanceAfter,
                currency,
                symbolLogo,
                onWithdrow,
            });
        })
);
