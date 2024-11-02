import { FC, useEffect } from 'react';
// import { TonConnectButton } from '@tonconnect/ui-react';
import EtfCard from '@/components/ETFCard/ETFCard.tsx';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { ETFS_DATA_MOCK } from '@/data/mock_data.ts';

import './IndexPage.scss';
import { useBackButton } from '@telegram-apps/sdk-react';
import LearnSection from '@/components/LearnSection/LearnSection.tsx';

export const IndexPage: FC = () => {
    const backButton = useBackButton();

    const { wallet_info } = useAppSelector((state) => state.appSlice);

    // const balanceValues = `${
    //     wallet_info?.totalamount ? wallet_info?.totalamount.toFixed(2) : '0.00'
    // }`.split('.');

    useEffect(() => {
        if (backButton) {
            backButton.hide();
        }
    }, []);

    return (
        <section className={'container'}>
            {/* <TonConnectButton className="ton-connect__button" /> */}
            {/* <section className={'index--balance'}>
                <h2>Current balance</h2>
                <p>
                    $ {balanceValues[0]}
                    <span>.{balanceValues[1]}</span>
                </p>
            </section> */}
            <section className={'etf-cards'}>
                {ETFS_DATA_MOCK.map((etf) => {
                    const userEtfBalance =
                        wallet_info?.jettons?.find(
                            (jetton) => jetton.symbol === etf.jettonSymbol
                        )?.price || 0;
                    return (
                        <EtfCard
                            address={etf?.address}
                            key={etf.jettonSymbol}
                            personEtfBalance={userEtfBalance}
                            {...etf}
                        />
                    );
                })}
            </section>
            <LearnSection />
        </section>
    );
};
