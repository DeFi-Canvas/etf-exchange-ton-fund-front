import { Suspense, type ComponentType, type JSX } from 'react';

import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { newNewUserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { useInitData } from '@telegram-apps/sdk-react';
import { getContainers } from './containers';
import { indexRouter } from './page-routes/index-router';
import { depositRouter } from './page-routes/deposit-router';
import { withdrawRouter } from './page-routes/withdraw-router';
import { whatToBuyRouter } from './page-routes/what-to-buy-router';
import { TransactionView } from '@pages/transaction-view/transaction-view.page.tsx';
import { Loader } from '@/components/loader/loader.component';
import { newNewI18NService } from '@/store/i18n/i18.store';

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

    const i18n = useValueWithEffect(() => newNewI18NService(), []);

    //#region containers
    const containers = getContainers({
        userStore,
        i18n,
    });

    //#region routes
    const routes: Route[] = [
        ...indexRouter(containers),
        ...depositRouter(containers),
        ...withdrawRouter(containers),
        ...whatToBuyRouter(containers),
        {
            path: 'profile',
            page: containers.Profile,
        },
        {
            path: '/assets/:assetId',
            page: containers.AssetPage,
        },
        {
            path: '/swap',
            page: containers.SwapePage,
        },
        // не рабочие стр
        {
            path: '/transaction-view',
            page: TransactionView,
        },
    ];

    return (
        <>
            <Suspense fallback={<Loader />}>
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
                                                    <Navigate
                                                        to={subRoute.path}
                                                    />
                                                }
                                            />
                                        ))}
                                </Route>
                            );
                        }
                    })}
                    <Route path="/" element={<Navigate to="/" />} />
                </Routes>
            </Suspense>
        </>
    );
};
