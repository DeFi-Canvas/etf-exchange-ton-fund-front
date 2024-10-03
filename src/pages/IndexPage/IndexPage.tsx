import type {FC} from 'react';
import {TonConnectButton, useTonWallet} from "@tonconnect/ui-react";
import './IndexPage.scss'
import EtfCard from "@/components/ETFCard/ETFCard.tsx";
import firstCardImage from './../../assets/images/first_card_image.png'
import secondCardImage from './../../assets/images/second_card_image.png'

export const IndexPage: FC = () => {
  const wallet = useTonWallet()
  console.log(wallet)
  const balanceValues =  `${(0).toFixed(2)}`.split('.')
  return (
    <section className={'container'}>
      <TonConnectButton className='ton-connect__button'/>
      <section className={'index--balance'}>
        <h2>Current balance</h2>
        <p>$ {balanceValues[0]}<span>.{balanceValues[1]}</span></p>
      </section>
      <section className={'etf-cards'}>
        <EtfCard
          etfURL={'/etf-pro'}
          title="ETF Pro"
          description={'Stable fund for long term investment'}
          imgUrl={firstCardImage}
          tvl={1235}
          personEtfBalance={0}
          aprPercent={10}
          etfPriceChange={12.76}
          badgeText={'MOST POPULAR'}
        />
        <EtfCard
          etfURL={'/memes'}
          title="Memes"
          description={'For those of you who like memes'}
          imgUrl={secondCardImage}
          badgeText={'COMING SOON'}
        />
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
