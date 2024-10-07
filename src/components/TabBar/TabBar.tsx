import './TabBar.scss'
import ButtonPrimary from "@/components/Buttons/ButtonPrimary.tsx";
import {Fragment} from "react";
import TabBarItem from "@/components/TabBar/TabBarItem.tsx";
import {AboutIcon, HomeIcon} from "@/components/Icons/Icons.tsx";
import {useLocation, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {setInvestStep} from "@/store/reducers/appSlice.ts";


const TabBar = () => {
  const dispatch = useAppDispatch()
  const {investStep, selectedCoinToInvest} = useAppSelector(state => state.appSlice)
  const {pathname} = useLocation()
  const navigator = useNavigate()

  const renderTabBar = () => {
    const isFund = /^\/funds\/\w+$/.test(pathname)
    const isSteps = /^\/invest/.test(pathname)
    const fund = pathname.split('/')[2]
    const isETFP = fund !== 'ETFP'

    const onStartInvestClick = async () => {
      navigator('/invest/' + fund)
    }

    const onStepsClick = async () => {
      dispatch(setInvestStep(investStep + 1))
    }

    if (isFund) return <ButtonPrimary text={'Invest'} isDisabled={isETFP} onClick={onStartInvestClick}/>
    if (isSteps) {
      if (investStep === 1) return <ButtonPrimary text={'Continue'} isDisabled={!selectedCoinToInvest} onClick={onStepsClick}/>
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