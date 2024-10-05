import type {FC} from 'react';
import {TonConnectButton} from "@tonconnect/ui-react";
import EtfCard from "@/components/ETFCard/ETFCard.tsx";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import {etfs_data} from "@/data/mock_data.ts";

import './IndexPage.scss'

export const IndexPage: FC = () => {
  const {wallet_info} = useAppSelector(state => state.appSlice)
  const balanceValues = `${wallet_info?.totalamount ? wallet_info?.totalamount.toFixed(2) : '0.00'}`.split('.')

  return (
    <section className={'container'}>
      <TonConnectButton className='ton-connect__button'/>
      <section className={'index--balance'}>
        <h2>Current balance</h2>
        <p>$ {balanceValues[0]}<span>.{balanceValues[1]}</span></p>
      </section>
      <section className={'etf-cards'}>{
        etfs_data.map((etf) => {
          const userEtfBalance = wallet_info?.jettons.find((jetton) => jetton.symbol === etf.jettonSymbol)?.price || 0
          return <EtfCard key={etf.jettonSymbol} personEtfBalance={userEtfBalance} {...etf} />
        })
      }
      </section>

      {/*  <Section
        header='Application Launch Data'
        footer='These pages help developer to learn more about current launch information'
      >
        <Link to='/init-data'>
          <Cell subtitle='User data, chat information, technical data'>Init Data</Cell>
        </Link>
        <Link to='/launch-params'>
          <Cell subtitle='Platform identifier, Mini Apps version, etc.'>Launch Parameters</Cell>
        </Link>
        <Link to='/theme-params'>
          <Cell subtitle='Telegram application palette information'>Theme Parameters</Cell>
        </Link>
      </Section>*/}
    </section>
  );
};
