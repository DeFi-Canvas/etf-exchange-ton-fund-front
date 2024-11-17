import React, { memo } from 'react';
import { Footer } from './footer.component';
import { WithdrowService } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';

export const FooterContainer = injectable(
    token('withdrowStore')<WithdrowService>(),
    (store) =>
        memo(() => {
            const currency = useProperty(store.currency);
            const balanceAfter = useProperty(store.balanceAfter);
            const symbolLogo = useProperty(store.symbolLogo);

            return React.createElement(Footer, {
                balanceAfter,
                currency,
                symbolLogo,
            });
        })
);
