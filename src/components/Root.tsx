import { SDKProvider } from '@telegram-apps/sdk-react';
import { THEME, TonConnectUIProvider } from '@tonconnect/ui-react';
import { type FC, useMemo } from 'react';
import { App } from '@/components/App.tsx';
import { ErrorBoundary } from '@/components/ErrorBoundary.tsx';

const ErrorBoundaryError: FC<{ error: unknown }> = ({ error }) => (
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
    const manifestUrl = useMemo(() => {
        return new URL(
            'tonconnect-manifest.json',
            window.location.href
        ).toString();
    }, []);

    return (
        <TonConnectUIProvider
            uiPreferences={{ theme: THEME.LIGHT }}
            manifestUrl={manifestUrl}
        >
            <SDKProvider acceptCustomStyles>
                <App />
            </SDKProvider>
        </TonConnectUIProvider>
    );
};

export const Root: FC = () => (
    <ErrorBoundary fallback={ErrorBoundaryError}>
        <Inner />
    </ErrorBoundary>
);
