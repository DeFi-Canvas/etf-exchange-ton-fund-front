import { useIntegration } from '@telegram-apps/react-router-integration';
import {
    bindViewportCSSVars,
    initNavigator,
    initMiniApp,
    useBackButton,
    useInitData,
    initViewport,
    Viewport,
} from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo, useState } from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@/navigation/routes.tsx';
import TabBar from '@/components/TabBar/TabBar.tsx';
import {
    TwaAnalyticsProvider,
    TrackGroups,
} from '@tonsolutions/telemetree-react';
import { getContainers } from '@/navigation/containers';
import { newTransactionsRestService } from '@/API/transactions/transactions.service';
import { newNewCahe } from '@/store/cache/cahe.store';
import { newNewI18NService } from '@/store/i18n/i18.store';
import { newNewUserStoreService } from '@/store/user.store';
import { useValueWithEffect } from '@/utils/run-view-model.utils';
import { newAssetsRestService } from '@/API/assets/assets.service';

const PAGE_URLS = [
    '/',
    '/what-to-buy',
    '/profile',
    '/funds', // TODO временно, пока не будет переписано на табы
    '/transactions', // TODO временно, пока не будет переписано на табы
];

export const App: FC = () => {
    const [miniApp] = initMiniApp();
    const backButton = useBackButton();
    const [viewport, setViewport] = useState<Viewport | undefined>(undefined);

    // Красим фон шапки приложения. TODO По хорошему бы сформировать константы js на основе css переменных
    miniApp.setHeaderColor('#F9F8FF');

    useEffect(() => {
        initViewport()[0].then((x) => setViewport(x));
    }, [window.innerHeight]);

    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport) && viewport.expand();
    }, [viewport, bindViewportCSSVars]);

    // Create a new application navigator and attach it to the browser history, so it could modify
    // it and listen to its changes.
    const navigator = useMemo(() => initNavigator('app-navigation-state'), []);
    const [location, reactNavigator] = useIntegration(navigator);

    // Don't forget to attach the navigator to allow it to control the BackButton state as well
    // as browser history.
    useEffect(() => {
        navigator.attach();
        return () => navigator.detach();
    }, [navigator]);

    const isVisibleTabBar = PAGE_URLS.includes(location.pathname);

    useEffect(() => {
        if (PAGE_URLS.some((pathname) => pathname === location.pathname)) {
            backButton.hide();
        } else {
            backButton.show();
        }
    });
    const initData = useInitData();

    const userStore = newNewUserStoreService(initData?.user);
    const i18n = useValueWithEffect(
        () => newNewI18NService(),
        [newNewI18NService]
    );
    const cacheStore = newNewCahe();
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

    const containers = useMemo(
        () =>
            getContainers({
                userStore,
                i18n,
                assetService,
                cacheStore,
                transactionsService,
            }),
        [userStore, i18n, assetService, cacheStore, transactionsService]
    );
    const services = useMemo(
        () => ({
            userStore,
            i18n,
            assetService,
            cacheStore,
            transactionsService,
        }),
        [userStore, i18n, assetService, cacheStore, transactionsService]
    );

    return (
        <TwaAnalyticsProvider
            projectId="97b7f373-97d9-44b1-b1fc-2f36aa620e81"
            apiKey="393a9e38-9be5-4dfe-ad36-77286e6388c9"
            trackGroup={TrackGroups.MEDIUM}
        >
            {/* <main>123</main> */}
            <Router location={location} navigator={reactNavigator}>
                <main>
                    <AppRoutes containers={containers} services={services} />
                </main>
                {isVisibleTabBar ? <TabBar /> : null}
            </Router>
        </TwaAnalyticsProvider>
    );
};
