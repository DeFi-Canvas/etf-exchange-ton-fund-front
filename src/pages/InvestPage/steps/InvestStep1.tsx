import RowWithImage from "@/components/RowWithImage/RowWithImage";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import ton from '@/assets/icons/Ton.svg?url'
import usdt from '@/assets/icons/USDT.svg?url'
import dogs from '@/assets/images/DOGS.png'

import './InvestSteps.scss';
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {setSelectedCoinToInvest} from "@/store/reducers/appSlice.ts";

const InvestStep1 = () => {
  const dispatch = useAppDispatch()
  const {wallet_info, selectedCoinToInvest} = useAppSelector(state => state.appSlice)
  const tonBalance = wallet_info?.balance.toFixed(2) || 0
  const usdtBalance = wallet_info?.jettons.find((el) => el.symbol === 'USDT')?.balance || 0
  const dogsBalance = wallet_info?.jettons.find((el) => el.symbol === 'DOGS')?.balance || 0

  const handleCoinClick = (symbol: string) => {
    dispatch(selectedCoinToInvest === symbol ? setSelectedCoinToInvest('') : setSelectedCoinToInvest(symbol))
  }

  return (
    <div className={'invest-steps--content'}>
      <div className={'invest-steps--content-text'}>
        <h2>Please, select one asset</h2>
        <p>Choose your preferred token for secure and transparent fund investment</p>
      </div>

      <div className={'invest-steps--content-coins'}>
        <RowWithImage className={'row-with-image--white'} title={'TON'} image={ton} subTitle={'Toncoin'}
                      disabled={!tonBalance} numbers={tonBalance} onClick={() => handleCoinClick('TON')} isSelected={selectedCoinToInvest === 'TON'}/>
        <RowWithImage className={'row-with-image--white'} title={'USDT'} image={usdt} subTitle={'Tether USDT'}
                      disabled={true} numbers={usdtBalance}/>
        <RowWithImage className={'row-with-image--white'} title={'DOGS'} image={dogs} subTitle={'Dogs'} disabled={true}
                      numbers={dogsBalance}/>
      </div>
    </div>
  );
};

export default InvestStep1;