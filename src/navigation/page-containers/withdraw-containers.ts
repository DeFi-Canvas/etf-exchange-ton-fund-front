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
    cacheStore,
    assetService,
    scheduler,
    withdrowStore,
    waletRestService,
}: Pick<
    getContainersArgs,
    | 'i18n'
    | 'userStore'
    | 'cacheStore'
    | 'assetService'
    | 'scheduler'
    | 'withdrowStore'
    | 'waletRestService'
>): WithdrowContainers => ({
    Withdrow: Withdrow({
        userStore,
        i18n,
        assetService,
        cacheStore,
        scheduler,
        withdrowStore,
        waletRestService,
    }),
    Amount: AmountContainer({
        userStore,
        i18n,
        scheduler,
    }),
    Address: AddressContainer({
        userStore,
        i18n,
        scheduler,
    }),
    Check: CheckContainer({
        userStore,
        i18n,
        scheduler,
    }),
    Final: FinalContainer({
        userStore,
        i18n,
        scheduler,
    }),
});
