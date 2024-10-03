import type { FC } from 'react';
import {TonConnectButton} from "@tonconnect/ui-react";
import './IndexPage.scss'


export const IndexPage: FC = () => {
  return (
    <section className={'container'}>
      <TonConnectButton className='ton-connect__button'/>

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
