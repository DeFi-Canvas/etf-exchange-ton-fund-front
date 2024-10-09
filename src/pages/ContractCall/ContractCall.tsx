import Loader from "@/components/Loader/Loader.tsx";
import { TonConnectButton, useTonConnectUI, useTonWallet} from "@tonconnect/ui-react";
import {useEffect} from "react";

const ContractCall = () => {
  const wallet = useTonWallet()
 const [tonui] =  useTonConnectUI()


  useEffect(() => {
    if(wallet?.account.address){
        tonui.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
          messages:[
            {
              address: '0QA-eUvzebQBJRYElfcfUoi21RzRViFXaiPGlAuk4cT-I61H',
              amount: '100000000',
              stateInit: 'hello'
            }
          ]
        })
       /* connector.sendTransaction({
          validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
          messages:[
            {
              address: '0QA-eUvzebQBJRYElfcfUoi21RzRViFXaiPGlAuk4cT-I61H',
              amount: '100000000',
            }
          ]
        })*/

    }
  }, [wallet]);

  return (
    <section className={'container contract-call'}>
      <TonConnectButton></TonConnectButton>
      <Loader/>
      <p>Signing the contract</p>
    </section>
  );
};

export default ContractCall;