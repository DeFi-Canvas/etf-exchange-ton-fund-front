import ButtonPrimary from '@/components/Buttons/ButtonPrimary.tsx';
import { useMemo } from 'react';
import TabBarItem from '@/components/TabBar/TabBarItem.tsx';
import {
    HomeIcon,
    ProfileIcon,
    WhatToBuyIcon,
} from '@/components/Icons/Icons.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { useTonWallet } from '@tonconnect/ui-react';
import ButtonsSecondary from '@/components/Buttons/ButtonsSecondary.tsx';
import { calcIsError } from '@/utils/calcIsError.ts';
import SlideButton from '@/components/SlideButton/SlideButton.tsx';

import css from './tab-bar.module.css';
import cn from 'classnames';

const TabBar = () => {
    const { selectedCoinToInvest, valueToInvest, wallet_info } = useAppSelector(
        (state) => state.appSlice
    );
    const selectedCoin = useMemo(() => {
        if (!selectedCoinToInvest) return;
        if (selectedCoinToInvest === 'TON') {
            return {
                balance: wallet_info?.balance ?? 0,
                price: wallet_info?.price ?? 0,
                name: 'TON',
                symbol: 'TON',
                image: '/assets/icons/Ton.svg',
                jetton: 'TON',
                wallet: '',
            };
        } else {
            return wallet_info?.jettons?.find(
                (j) => j.name === selectedCoinToInvest
            );
        }
    }, [wallet_info, selectedCoinToInvest]);
    const { pathname } = useLocation();
    const navigator = useNavigate();

    const renderTabBar = () => {
        const wallet = useTonWallet();
        const isFund = /^\/funds\/\w+$/.test(pathname);
        const isSteps = /^\/invest/.test(pathname);
        const fund = pathname.split('/')[2];
        const isETFP = fund === 'ETFP';
        const step = pathname.split('/')[3];

        const onStartInvestClick = async () => {
            navigator('/invest/' + fund + '/1');
        };

        const onStepsClick = async (currentStep: number) => {
            navigator('/invest/' + fund + '/' + (currentStep + 1));
        };

        if (isFund)
            return (
                <ButtonPrimary
                    text={'Invest'}
                    isDisabled={!isETFP || !wallet?.account.address}
                    onClick={onStartInvestClick}
                />
            );
        if (isSteps) {
            if (step && step === '1')
                return (
                    <ButtonPrimary
                        text={'Continue'}
                        isDisabled={
                            !selectedCoinToInvest || !selectedCoin?.balance
                        }
                        onClick={() => onStepsClick(1)}
                    />
                );
            if (step && step === '2')
                return (
                    <ButtonsSecondary
                        text={
                            valueToInvest !== 0
                                ? 'Continue'
                                : 'Enter the total amount'
                        }
                        isDisabled={
                            !valueToInvest ||
                            calcIsError({
                                minValue: 1,
                                currentValue: valueToInvest,
                                maxValue: selectedCoin?.balance || 0,
                            })
                        }
                        onClick={() => onStepsClick(2)}
                    />
                );

            if (step && step === '3')
                return (
                    <SlideButton
                        onSwipe={() =>
                            navigator('/invest/' + fund + '/' + 'final')
                        }
                    />
                );
            if (step && step === 'final') return;

            return <ButtonPrimary text={'Continue'} isDisabled={isETFP} />;
        }

        //TOD: доделать стили
        return (
            <>
                <TabBarItem text={'Home'} to={'/'}>
                    <HomeIcon
                        isActive={pathname === '/' || pathname === '/assets'}
                    />
                </TabBarItem>
                <TabBarItem text={'What to buy'} to={'/what-to-buy'}>
                    <WhatToBuyIcon isActive={pathname === '/what-to-buy'} />
                </TabBarItem>
                <TabBarItem text={'Profile'} to={'/profile'}>
                    <ProfileIcon
                        className={cn(css['profile-icon'], {
                            [css['profile-active']]: pathname === '/profile',
                        })}
                    />
                </TabBarItem>
            </>
        );
    };

    return (
        <nav className={css.tabBar}>
            <div className={css.wrapper}>{renderTabBar()}</div>
        </nav>
    );
};

export default TabBar;
