import './TabBar.scss'
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.tsx";
import {Fragment, useMemo} from "react";
import TabBarItem from "@/components/TabBar/TabBarItem.tsx";
import {AboutIcon, HomeIcon} from "@/components/Icons/Icons.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import {useTonWallet} from "@tonconnect/ui-react";
import ButtonsSecondary from "@/components/Buttons/ButtonsSecondary.tsx";
import {calcIsError} from "@/utils/calcIsError.ts";
import SlideButton from "@/components/SlideButton/SlideButton.tsx";


const TabBar = () => {
  const { selectedCoinToInvest, valueToInvest, wallet_info} = useAppSelector(state => state.appSlice)
  const selectedCoin = useMemo(() => {
    if(!selectedCoinToInvest) return
    if (selectedCoinToInvest === 'TON') {
      return {
        balance: wallet_info?.balance ?? 0,
        price: wallet_info?.price ?? 0,
        name: 'TON',
        symbol: 'TON',
        image: '/assets/icons/Ton.svg',
        jetton: 'TON',
        wallet: ''
      }
    } else {
      return wallet_info?.jettons?.find(j => j.name === selectedCoinToInvest)
    }
  }, [wallet_info, selectedCoinToInvest])
  const {pathname} = useLocation()
  const navigator = useNavigate()

  const renderTabBar = () => {
    const wallet = useTonWallet()
    const isFund = /^\/funds\/\w+$/.test(pathname)
    const isSteps = /^\/invest/.test(pathname)
    const fund = pathname.split('/')[2]
    const isETFP = fund === 'ETFP'
    const step = pathname.split('/')[3]

    const onStartInvestClick = async () => {
      navigator('/invest/' + fund + '/1')
    }

    const onStepsClick = async (currentStep: number) => {
      navigator('/invest/' + fund + '/' + (currentStep + 1))
    }

    if (isFund) return <ButtonPrimary text={'Invest'} isDisabled={!isETFP || !wallet?.account.address}
                                      onClick={onStartInvestClick}/>
    if (isSteps) {
      if (step && step === '1') return <ButtonPrimary text={'Continue'} isDisabled={!selectedCoinToInvest}
                                                  onClick={() => onStepsClick(1)}/>
      if (step && step === '2') return <ButtonsSecondary text={valueToInvest !== 0 ? 'Continue' : 'Enter the total amount'} isDisabled={!valueToInvest || calcIsError({minValue:1, currentValue: valueToInvest, maxValue: selectedCoin?.balance || 0})}
                                                      onClick={() => onStepsClick(2)}/>

      if(step && step === '3') return  <SlideButton onSwipe={() => navigator('/invest/' + fund + '/' + 'final')} />
      if(step && step === 'final') return

      return <ButtonPrimary text={'Continue'} isDisabled={isETFP}/>
    }

    return <Fragment>
      <TabBarItem text={'Home'} to={'/'}>
        <HomeIcon className={pathname === '/' ? 'home-active home-icon' : 'home-icon'}/>
      </TabBarItem>
      <TabBarItem text={'About'} to={'/about'}>
        <AboutIcon className={pathname === '/about' ? 'about-active home-icon' : 'home-icon'}/>
      </TabBarItem>
    </Fragment>
  }

  return (
    <nav className={'tabBar'}>
      <div className={'tabBar__wrapper'}>
        {renderTabBar()}
      </div>
    </nav>
  );
};

export default TabBar;