import { useIntegration } from '@telegram-apps/react-router-integration';
import {
    bindViewportCSSVars,
    initNavigator,
    useViewport,
} from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@/navigation/routes.tsx';
import TabBar from '@/components/TabBar/TabBar.tsx';

export const App: FC = () => {
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

    return (
        <Router location={location} navigator={reactNavigator}>
            <main>
                <AppRoutes />
            </main>
            <TabBar />
        </Router>
    );
};
