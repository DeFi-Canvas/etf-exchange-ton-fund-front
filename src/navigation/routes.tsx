import { memo, Suspense, useMemo, type ComponentType, type JSX } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getContainers, getContainersArgs } from './containers';
import { indexRouter } from './page-routes/index-router';
import { depositRouter } from './page-routes/deposit-router';
import { withdrawRouter } from './page-routes/withdraw-router';
import { whatToBuyRouter } from './page-routes/what-to-buy-router';
import { TransactionView } from '@pages/transaction-view/transaction-view.page.tsx';
import { Loader } from '@/components/loader/loader.component';
import { StormContainer } from '@/pages/earn/deposit-protocol/storm/storm.container';
import { newAssetsRestService } from '@/API/assets/assets.service';
import { newTransactionsRestService } from '@/API/transactions/transactions.service';
import { newNewCahe } from '@/store/cache/cahe.store';
import { newNewI18NService } from '@/store/i18n/i18.store';
import { UserData } from '@/store/user.store';
import { scheduler, useValueWithEffect } from '@/utils/run-view-model.utils';
import { useInitData } from '@telegram-apps/sdk-react';
import { newWalletRestService } from '@/API/wallet/wallet.service';
import { newNewWithdrowStore } from '@/pages/withdrow/withdrow.store';
import { newSwapRestService } from '@/API/swap.service';
import { newDeDustRestService } from '@/API/de-dust/de-dust.service';

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

export const AppRoutes = memo(() => {
    const initData = useInitData();

    //#region services
    const userData = initData?.user ?? ({} as UserData);
    const run = useValueWithEffect({
        scheduler,
    });

    const i18n = run(() => newNewI18NService(), [newNewI18NService]);
    const cacheStore = newNewCahe();
    const deDustRestService = newDeDustRestService();

    const transactionsService = useMemo(
        () =>
            newTransactionsRestService({
                cacheStore,
            }),
        [newTransactionsRestService, cacheStore]
    );
    const assetService = useMemo(
        () => newAssetsRestService({ cacheStore }),
        [newAssetsRestService, cacheStore]
    );

    const waletRestService = newWalletRestService({
        cacheStore,
    });
    const withdrowStore = run(
        newNewWithdrowStore({
            waletRestService,
        }),
        []
    );
    const swapService = newSwapRestService({ deDustRestService })(
        initData?.user?.id ?? 0
    );

    const services: getContainersArgs = useMemo(
        () => ({
            i18n,
            assetService,
            cacheStore,
            transactionsService,
            scheduler,
            withdrowStore,
            waletRestService,
            swapService,
            userData,
            deDustRestService,
        }),
        [i18n, assetService, cacheStore, transactionsService]
    );

    const containers = useMemo(
        () =>
            getContainers({
                ...services,
            }),
        [i18n, assetService, cacheStore, transactionsService]
    );
    //#region routes
    const routes: Route[] = useMemo(
        () => [
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
                    assetService: services.assetService,
                    scheduler: services.scheduler,
                    waletRestService: services.waletRestService,
                }),
            },
        ],
        []
    );

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
});
