import { AddressContainer } from '@withdrow/sub-page/address/address.container';
import { AmountContainer } from '@withdrow/sub-page/ammount/amount.container';
import { CheckContainer } from '@withdrow/sub-page/check/check.container';
import { FinalContainer } from '@withdrow/sub-page/final/final.container';
import { Withdrow } from '@withdrow/withdrow.page';
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
}: getContainersArgs): WithdrowContainers => ({
    Withdrow: Withdrow({
        userStore,
    }),
    Amount: AmountContainer({
        userStore,
    }),
    Address: AddressContainer({
        userStore,
    }),
    Check: CheckContainer({
        userStore,
    }),
    Final: FinalContainer({
        userStore,
    }),
});
