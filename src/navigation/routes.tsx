import { Suspense, type ComponentType, type JSX } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';
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
import { StormContainer } from '@/pages/earn/deposit-protocol/storm/storm.container';
import { newNewCahe } from '@/store/cache/cahe.store';
import { newAssetsRestService } from '@/API/assets/assets.service';
import { newTransactionsRestService } from '@/API/transactions/transactions.service';
import { newDefaultScheduler } from '@most/scheduler';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { newSwapStore } from '@/pages/swap/swap.store';
import { newWalletRestService } from '@/API/wallet.service';
import { newPurchaseSellStore } from '@/pages/what-to-buy/sub-page/purchase/purchase.store';

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

    const userStore = newNewUserStoreService(initData?.user);
    const scheduler = newDefaultScheduler();
    const run = useValueWithEffect({ scheduler });
    const withdrowStore = run(
        () => newNewWithdrowStore({ userStore }),
        [userStore]
    );
    const i18n = run(() => newNewI18NService(), []);
    const cacheStore = newNewCahe();
    const transactionsService = newTransactionsRestService({
        cacheStore,
    });
    const assetService = newAssetsRestService({ cacheStore });
    const swapStore = run(
        () =>
            newSwapStore({
                userStore,
                i18n,
                cacheStore,
                assetService,
            })(),
        []
    );

    const waletRestService = newWalletRestService({
        userStore,
        cacheStore,
    });

    const purchaseStore = run(
        newPurchaseSellStore({
            userStore,
            cacheStore,
        }),
        []
    );

    //#region containers
    const containers = getContainers({
        userStore,
        i18n,
        assetService,
        cacheStore,
        transactionsService,
        scheduler,
        withdrowStore,
        swapStore,
        waletRestService,
        purchaseStore,
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
        {
            path: '/earn',
            page: StormContainer({
                assetService,
                cacheStore,
                scheduler,
            }),
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
