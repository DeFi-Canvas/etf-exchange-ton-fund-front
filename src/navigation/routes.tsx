import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage-1/IndexPage';
import FundPage from '@/pages/FundPage/FundPage.tsx';
import { WaletPageContainer } from '@/pages/whalet/whalet.container';
import { DepositPageContainer } from '@/pages/deposit/deposit.page';
import { Routes, Route, Navigate } from 'react-router-dom';
import { newNewUserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useInitData } from '@telegram-apps/sdk-react';
import { ProfileContainer } from '@/pages/profile/profile.page';
import { AssetsContainer } from '@/pages/whalet/sub-pages/assets/assets.container';
import { DepositEndPointContainer } from '@/pages/deposit-end-point/deposit-end-point.container';
import { Withdrow } from '@/pages/withdrow/withdrow.page';
import { AmountContainer } from '@/pages/withdrow/sub-page/ammount/amount.container';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { AddressContainer } from '@/pages/withdrow/sub-page/address/address.container';
import { CheckContainer } from '@/pages/withdrow/sub-page/check/check.container';
import { FinalContainer } from '@/pages/withdrow/sub-page/final/final.container';
import { FundsContainer } from '@/pages/whalet/sub-pages/founds/funds.container';
import { TransactionsContainer } from '@/pages/whalet/sub-pages/transactions/transactions.container';
import { Swap } from '@/pages/swap/swap.page';
import { SwapPage } from '@/pages/swap/sub-pages/swap/swap.component';
import { MultiSwapPage } from '@/pages/swap/sub-pages/multi-swap/multi-swap.component';

interface Route {
    path: string;
    page: ComponentType;
    parent?: Array<{
        path: string;
        page: ComponentType;
        isIndex?: boolean;
    }>;
    title?: string;
    icon?: JSX.Element;
}

export const AppRoutes = () => {
    const initData = useInitData();

    const userStore = useValueWithEffect(
        () => newNewUserStoreService(initData?.user),
        []
    );

    const withdrowStore = useValueWithEffect(
        () => newNewWithdrowStore({ userStore }),
        []
    );

    //#region containers
    const WhatToBuyPageContainerResolved = WaletPageContainer({
        userStore,
    });

    const ProfileResolved = ProfileContainer({
        userStore,
    });

    const AssetsResolved = AssetsContainer({
        userStore,
    });

    const TransactionsResolved = TransactionsContainer({
        userStore,
    });

    const FundsResolved = FundsContainer({
        userStore,
    });
    const DepositPageResolved = DepositPageContainer({
        userStore,
        withdrowStore,
    });

    const DepositEndPointResolved = DepositEndPointContainer({
        userStore,
    });

    const WithdrowResolved = Withdrow({
        userStore,
        withdrowStore,
    });

    const AmountResolved = AmountContainer({
        withdrowStore,
    });

    const AddressResolved = AddressContainer({
        withdrowStore,
    });

    const CheckResolved = CheckContainer({
        withdrowStore,
    });

    const FinalResolved = FinalContainer({
        withdrowStore,
    });
    //#region routes
    const routes: Route[] = [
        {
            path: '/',
            page: WhatToBuyPageContainerResolved,
            parent: [
                //загадка жака фреско откуда взялся #
                { path: '/', page: AssetsResolved, isIndex: true },
                { path: 'funds', page: FundsResolved },
                { path: 'transactions', page: TransactionsResolved },
            ],
        },
        { path: '/funds/:id', page: FundPage },
        {
            path: '/what-to-buy',
            page: IndexPage,
        },
        {
            path: 'deposit',
            page: DepositPageResolved,
        },
        {
            path: '/deposit/:ticker/deposit-end-point',
            page: DepositEndPointResolved,
        },
        {
            path: 'profile',
            page: ProfileResolved,
        },
        {
            path: 'withdraw',
            page: WithdrowResolved,
        },
        {
            path: '/withdraw/:ticker',
            page: AmountResolved,
        },
        {
            path: '/withdraw/:ticker/address',
            page: AddressResolved,
        },
        {
            path: '/withdraw/:ticker/address/check',
            page: CheckResolved,
        },
        {
            path: '/withdraw/:ticker/address/final',
            page: FinalResolved,
        },
        {
            path: '/swap',
            page: Swap,
            parent: [
                { path: '', page: SwapPage, isIndex: true },
                { path: 'multi-swap', page: MultiSwapPage },
            ],
        },
    ];

    return (
        <>
            <Routes>
                {/* will not work with deeper nesting. recursion? */}
                {routes.map((route) => {
                    if (!route.parent?.length) {
                        return (
                            <Route
                                key={route.path}
                                Component={route.page}
                                path={route.path}
                            />
                        );
                    } else {
                        return (
                            <Route
                                key={route.path}
                                Component={route.page}
                                path={route.path}
                            >
                                {route.parent.map((subRoute) => (
                                    <Route
                                        key={subRoute.path}
                                        path={subRoute.path}
                                        Component={subRoute.page}
                                        index={subRoute.isIndex}
                                    />
                                ))}
                                {route.parent
                                    .filter((el) => el.isIndex)
                                    .map((subRoute) => (
                                        <Route
                                            key={subRoute.path}
                                            path={subRoute.path}
                                            element={
                                                <Navigate to={subRoute.path} />
                                            }
                                        />
                                    ))}
                            </Route>
                        );
                    }
                })}
                <Route path="/" element={<Navigate to="/" />} />
            </Routes>
        </>
    );
};
