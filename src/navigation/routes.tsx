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
import { newToastifyStoreService } from '@/store/toaster.store';
import { NotificationsPageContainer } from '@/pages/notifications/notifications.container.page';

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
    const toastStore = useValueWithEffect(() => newToastifyStoreService(), []);
    // TEMP
    // @ts-ignore
    window.toastStore = toastStore;
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
        {
            path: '/notifications',
            page: NotificationsPageContainer,
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
