import type { ComponentType, JSX } from 'react';

import { IndexPage } from '@/pages/IndexPage/IndexPage';
import AboutPage from '@/pages/AboutPage/AboutPage.tsx';
import FundPage from '@/pages/FundPage/FundPage.tsx';
import InvestPage from '@/pages/InvestPage/InvestPage.tsx';
import { WhatToBuyPageContainer } from '@/pages/what-to-buy/what-to-buy.container';
import { DepositPage } from '@/pages/deposit/deposit.page';
import { Funds } from '@/pages/what-to-buy/sub-pages/founds/funds.page';
import { Transactions } from '@/pages/what-to-buy/sub-pages/transactions/transactions.page';
import { Routes, Route, Navigate } from 'react-router-dom';
import { newNewUserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useInitData } from '@telegram-apps/sdk-react';
import { Profile } from '@/pages/profile/profile.page';
import { AssetsContainer } from '@/pages/what-to-buy/sub-pages/assets/assets.container';

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

    const WhatToBuyPageContainerResolved = WhatToBuyPageContainer({
        userStore,
    });

    const ProfileResolved = Profile({
        userStore,
    });

    const AssetsResolved = AssetsContainer({
        userStore,
    });

    const routes: Route[] = [
        {
            path: '/',
            page: WhatToBuyPageContainerResolved,
            parent: [
                //загадка жака фреско откуда взялся #
                { path: '/', page: AssetsResolved, isIndex: true },
                { path: 'funds', page: Funds },
                { path: 'transactions', page: Transactions },
            ],
        },
        { path: '/about', page: AboutPage },
        { path: '/funds/:id', page: FundPage },
        { path: '/invest/:id/:step', page: InvestPage },
        {
            path: '/what-to-buy',
            page: IndexPage,
        },
        {
            path: 'deposit',
            page: DepositPage,
        },
        {
            path: 'profile',
            page: ProfileResolved,
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
                                {...route}
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
                                            path="/"
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
