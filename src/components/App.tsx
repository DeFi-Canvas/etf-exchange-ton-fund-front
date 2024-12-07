import { useIntegration } from '@telegram-apps/react-router-integration';
import '@/assets/styles/index.scss';

import {
    bindViewportCSSVars,
    initNavigator,
    useViewport,
} from '@telegram-apps/sdk-react';
import { type FC, useEffect, useMemo } from 'react';
import { Router } from 'react-router-dom';
import { AppRoutes } from '@/navigation/routes.tsx';
import TabBar from '@/components/TabBar/TabBar.tsx';

// import OnbardScreen from '@/components/OnbardScreen/OnbardScreen.tsx';

export const App: FC = () => {
    const viewport = useViewport();
    // const wallet = useTonWallet();
    // const dispatch = useAppDispatch();
    // const { wallet_info, appStatus, userData } = useAppSelector(
    //     (state) => state.appSlice
    // );

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

    // useEffect(() => {
    //     if (wallet?.account.address && !wallet_info) {
    //         const address = toUserFriendlyAddress(wallet.account.address);
    //         Promise.all([
    //             dispatch(setWalletAddress(address)),
    //             dispatch(fetchWalletInfoTC({ address })),
    //         ]);
    //     }
    //     !wallet?.account &&
    //         dispatch(setWalletAddress('')) &&
    //         dispatch(refreshWalletInfo());
    // }, [wallet?.account.address]);

    // useEffect(() => {
    //     if (!userData && initData && initData.user) {
    //         const userData = {
    //             id: initData.user.id,
    //             userName: initData.user.username || 'unknown',
    //         };
    //         dispatch(sendUserDataTC(userData));
    //     }
    // }, []);

    // if (wallet?.account.address && wallet?.account.chain !== '-3')
    //     return (
    //         <div className={'container'}>
    //             <h2>Please connect to test network.</h2>
    //             <TonConnectButton className="ton-connect__button" />
    //         </div>
    //     );

    // if (appStatus === 'loading')
    //     return (
    //         <div className={'container items-center'}>
    //             {userData && userData?.created_at === userData?.updated_at ? (
    //                 <OnbardScreen />
    //             ) : (
    //                 // <Fragment />
    //             )}
    //         </div>
    //     );

    return (
        <Router location={location} navigator={reactNavigator}>
            <main>
                <AppRoutes />
            </main>
            <TabBar />
        </Router>
    );
};
