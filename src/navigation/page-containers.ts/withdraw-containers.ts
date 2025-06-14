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
}: Pick<getContainersArgs, 'i18n' | 'userStore'>): WithdrowContainers => ({
    Withdrow: Withdrow({
        userStore,
        i18n,
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
    // Withdrow: lazy(() =>
    //     import('@withdrow/withdrow.page').then((c) => {
    //         const component = c.Withdrow({ userStore });
    //         return { default: component };
    //     })
    // ),
    // Amount: lazy(() =>
    //     import('@withdrow/sub-page/ammount/amount.container').then((c) => {
    //         const component = c.AmountContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // Address: lazy(() =>
    //     import('@withdrow/sub-page/address/address.container').then((c) => {
    //         const component = c.AddressContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // Check: lazy(() =>
    //     import('@withdrow/sub-page/check/check.container').then((c) => {
    //         const component = c.CheckContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
    // Final: lazy(() =>
    //     import('@withdrow/sub-page/final/final.container').then((c) => {
    //         const component = c.FinalContainer({ userStore });
    //         return { default: component };
    //     })
    // ),
});
