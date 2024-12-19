import { useIntegration } from '@telegram-apps/react-router-integration';
import {
    bindViewportCSSVars,
    initNavigator,
    useViewport,
    initMiniApp,
} from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@/navigation/routes.tsx';
import TabBar from '@/components/TabBar/TabBar.tsx';

const PAGE_URLS = [
    '/',
    '/what-to-buy',
    '/profile',
    '/funds', // TODO временно, пока не будет переписано на табы
    '/transactions', // TODO временно, пока не будет переписано на табы
];

export const App: FC = () => {
    const [miniApp] = initMiniApp();

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

    return (
        <Router location={location} navigator={reactNavigator}>
            <main>
                <AppRoutes />
            </main>
            {isVisibleTabBar ? <TabBar /> : null}
        </Router>
    );
};
