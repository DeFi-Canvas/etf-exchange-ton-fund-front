import { AddressContainer } from '@/pages/withdrow/sub-page/address/address.container';
import { AmountContainer } from '@/pages/withdrow/sub-page/ammount/amount.container';
import { CheckContainer } from '@/pages/withdrow/sub-page/check/check.container';
import { FinalContainer } from '@/pages/withdrow/sub-page/final/final.container';
import { Withdrow } from '@/pages/withdrow/withdrow.page';
import { Component, getContainersArgs } from '../containers';

export interface WithdrowContainers {
    Withdrow: Component;
    Amount: Component;
    Address: Component;
    Check: Component;
    Final: Component;
}

export const getWithdrowContainers = ({
    userStore,
    i18n,
    assetsRestService,
    cacheStore,
}: Pick<
    getContainersArgs,
    'i18n' | 'userStore' | 'assetsRestService' | 'cacheStore'
>): WithdrowContainers => ({
    Withdrow: Withdrow({
        userStore,
        i18n,
        assetsRestService,
        cacheStore,
    }),
    Amount: AmountContainer({
        userStore,
        i18n,
    }),
    Address: AddressContainer({
        userStore,
        i18n,
    }),
    Check: CheckContainer({
        userStore,
        i18n,
    }),
    Final: FinalContainer({
        userStore,
        i18n,
    }),
});
