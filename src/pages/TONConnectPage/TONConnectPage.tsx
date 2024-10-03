import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';
import type { FC } from 'react';


import './TONConnectPage.css';

export const TONConnectPage: FC = () => {
  const wallet = useTonWallet();

  if (!wallet) {
    return (
      <main>
            <div>
              To display the data related to the TON Connect, it is required to connect your wallet
            </div>
            <TonConnectButton className='ton-connect-page__button'/>
      </main>
    );
  }

  const {
    account: { chain, publicKey, address },
    device: {
      appName,
      appVersion,
      maxProtocolVersion,
      platform,
      features,
    },
  } = wallet;

  return (
    <main className={'container'}>
      {'imageUrl' in wallet && (
        <>
          <section>
            <div>image: {wallet.imageUrl}</div>
            <div>name: {wallet.name}</div>
            <div>appName: {wallet.appName}</div>
          </section>
          <TonConnectButton className='ton-connect-page__button-connected'/>
        </>
      )}
      <section>
        <div>address {address}</div>
        <div>chain {chain}</div>
        <div>publicKey {publicKey}</div>
      </section>
      <section>
        <div>appName {appName}</div>
        <div>appVersion {appVersion}</div>
        <div>maxProtocolVersion {maxProtocolVersion}</div>
        <div>platform {platform}</div>
        <div>features {JSON.stringify(features)}</div>
      </section>

    </main>
  );
};
