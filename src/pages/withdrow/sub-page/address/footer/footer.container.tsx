import React, { memo } from 'react';
import { Footer } from './footer.component';
import { WithdrowStore } from '@/pages/withdrow/withdrow.store';
import { useProperty } from '@frp-ts/react';
import { injectable, token } from '@injectable-ts/core';
import { I18NService } from '@/store/i18n/i18.store';

export const FooterContainer = injectable(
    token('withdrowStore')<WithdrowStore>(),
    token('i18n')<I18NService>(),
    (store, i18n) =>
        memo(() => {
            const currency = useProperty(store.currency);
            const isGoToCheckAvailable = useProperty(
                store.isGoToCheckAvailable
            );
            const balanceAfter = useProperty(store.balanceAfter);
            const symbolLogo = useProperty(store.symbolLogo);
            const address = useProperty(store.address);
            const { Address: texts } = useProperty(i18n.Withdraw);

            return React.createElement(Footer, {
                balanceAfter,
                isGoToCheckAvailable,
                currency,
                symbolLogo,
                address,
                texts: texts.footer,
            });
        })
);
