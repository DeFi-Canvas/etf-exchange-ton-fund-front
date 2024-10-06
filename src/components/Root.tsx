import {SDKProvider, useLaunchParams} from '@telegram-apps/sdk-react';
import {THEME, TonConnectUIProvider} from '@tonconnect/ui-react';
import {Provider as ReduxProvider} from 'react-redux';
import {type FC, useEffect, useMemo} from 'react';

import {App} from '@/components/App.tsx';
import {ErrorBoundary} from '@/components/ErrorBoundary.tsx';
import {store} from "@/store";
import {TwaAnalyticsProvider} from "@tonsolutions/telemetree-react";

const ErrorBoundaryError: FC<{ error: unknown }> = ({error}) => (
  <div>
    <p>An unhandled error occurred:</p>
    <blockquote>
      <code>
        {error instanceof Error
          ? error.message
          : typeof error === 'string'
            ? error
            : JSON.stringify(error)}
      </code>
    </blockquote>
  </div>
);

const Inner: FC = () => {
  const debug = useLaunchParams().startParam === 'debug';
  const manifestUrl = useMemo(() => {
    return new URL('tonconnect-manifest.json', window.location.href).toString();
  }, []);
  const isDevMode = import.meta.env.DEV

  // Enable debug mode to see all the methods sent and events received.
  useEffect(() => {
    if (debug) {
      import('eruda').then((lib) => lib.default.init());
    }
  }, [debug]);

  return (
    <TonConnectUIProvider uiPreferences={{theme: THEME.LIGHT}} manifestUrl={manifestUrl}>
      <SDKProvider acceptCustomStyles debug={debug}>
        <ReduxProvider store={store}>
          {isDevMode ? <App/> : <TwaAnalyticsProvider
            projectId={"01d4b208-2a59-45bf-a14d-8e984cb169b5"}
            apiKey={"bed8ecf5-5668-41a1-85e3-2ee220f895be"}
            appName={"etf_test"}
          >
            <App/>
          </TwaAnalyticsProvider>}
        </ReduxProvider>
      </SDKProvider>
    </TonConnectUIProvider>
  );
};

export const Root: FC = () => (
  <ErrorBoundary fallback={ErrorBoundaryError}>
    <Inner/>
  </ErrorBoundary>
);
