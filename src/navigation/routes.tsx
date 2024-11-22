import type { ComponentType, JSX } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
import { newNewUserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useInitData } from '@telegram-apps/sdk-react';
import { Swap } from '@/pages/swap/swap.page';
import { SwapPage } from '@/pages/swap/sub-pages/swap/swap.component';
import { MultiSwapPage } from '@/pages/swap/sub-pages/multi-swap/multi-swap.component';
import { getContainers } from './containers';
import { indexRouter } from './page-routes/index-router';
import { depositRouter } from './page-routes/deposit-router';
import { withdrawRouter } from './page-routes/withdraw-router';
import { whatToBuyRouter } from './page-routes/what-to-buy-router';
import { ChartPage } from '@/pages/what-to-buy/sub-page/chart/chart.page';

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

    //#region containers
    const containers = getContainers({ userStore });

    //#region routes
    const routes: Route[] = [
        ...indexRouter(containers),
        ...depositRouter(containers),
        ...withdrawRouter(containers),
        ...whatToBuyRouter(containers),
        {
            path: 'profile',
            page: containers.ProfileResolved,
        },
        // не рабочие стр
        {
            path: '/swap',
            page: Swap,
            parent: [
                { path: '', page: SwapPage, isIndex: true },
                { path: 'multi-swap', page: MultiSwapPage },
            ],
        },
        // TEMP CHART DEMO
        {
            path: '/chart',
            page: () => (
                <ChartPage />
            ),
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
