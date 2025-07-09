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

export const getWithdrowContainers = (
    services: getContainersArgs
): WithdrowContainers => ({
    Withdrow: Withdrow({
        ...services,
    }),
    Amount: AmountContainer({
        ...services,
    }),
    Address: AddressContainer({
        ...services,
    }),
    Check: CheckContainer({
        ...services,
    }),
    Final: FinalContainer({
        ...services,
    }),
});
