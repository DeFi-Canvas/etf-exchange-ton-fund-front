import { useIntegration } from '@telegram-apps/react-router-integration';
import {
    bindViewportCSSVars,
    initNavigator,
    useViewport,
    initMiniApp,
    useBackButton,
} from '@telegram-apps/sdk-react';
import { type FC, Suspense, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@/navigation/routes.tsx';
import TabBar from '@/components/TabBar/TabBar.tsx';
import {
    TwaAnalyticsProvider,
    TrackGroups,
} from '@tonsolutions/telemetree-react';

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

    // Красим фон шапки приложения. TODO По хорошему бы сформировать константы js на основе css переменных
    miniApp.setHeaderColor('#F9F8FF');

    const viewport = useViewport();
    useEffect(() => {
        return viewport && bindViewportCSSVars(viewport) && viewport.expand();
    }, [viewport]);

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
    return (
        <TwaAnalyticsProvider
            projectId="97b7f373-97d9-44b1-b1fc-2f36aa620e81"
            apiKey="393a9e38-9be5-4dfe-ad36-77286e6388c9"
            trackGroup={TrackGroups.MEDIUM}
        >
            <Router location={location} navigator={reactNavigator}>
                <main>
                    <AppRoutes />
                </main>
                {isVisibleTabBar ? <TabBar /> : null}
            </Router>
        </TwaAnalyticsProvider>
    );
};
