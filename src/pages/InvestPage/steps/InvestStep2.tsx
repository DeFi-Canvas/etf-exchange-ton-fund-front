import { useAppSelector } from '@/hooks/useAppSelector.ts';
import CustomCoinInput from '@/components/CustomCoinInput/CustomCoinInput.tsx';
import ton from '@/assets/icons/Ton.svg?url';
import { JettonType } from '@/types.ts';
import { useEffect, useLayoutEffect, useMemo, useRef } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { setValueToInvest } from '@/store/reducers/appSlice.ts';
import { useLocation, useNavigate } from 'react-router-dom';
import { calcIsError } from '@/utils/calcIsError.ts';
import coin from '@/assets/video/ton.mp4';
import './InvestSteps.scss';

const InvestStep2 = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const pathname = useLocation().pathname;
    const navigator = useNavigate();
    const fund = pathname.split('/')[2];
    const dispatch = useAppDispatch();
    const { wallet_info, selectedCoinToInvest, valueToInvest } = useAppSelector(
        (state) => state.appSlice
    );

    const getCoinData = (): JettonType => {
        if (selectedCoinToInvest === 'TON') {
            return {
                balance: wallet_info?.balance ?? 0,
                price: wallet_info?.price ?? 0,
                name: 'TON',
                symbol: 'TON',
                image: ton,
                jetton: 'TON',
                wallet: '',
            };
        }
        return wallet_info?.jettons.find(
            (j) => j.name === selectedCoinToInvest
        ) as JettonType;
    };

    const selectedCoin = useMemo(
        () => getCoinData(),
        [wallet_info, selectedCoinToInvest]
    );
    const isError = useMemo(
        () =>
            calcIsError({
                maxValue: selectedCoin?.balance,
                currentValue: valueToInvest,
                minValue: 1,
            }),
        [wallet_info, valueToInvest, selectedCoinToInvest]
    );

    const onChange = (value: number) => {
        dispatch(setValueToInvest(value));
    };

    useLayoutEffect(() => {
        !selectedCoin && navigator(`/funds/${fund}`);
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            // Preload the video when the component mounts
            videoRef.current.load();
        }
    }, []);
    return (
        <div className={'invest-steps--content'}>
            <video ref={videoRef} preload="auto" style={{ display: 'none' }}>
                <source src={coin} type="video/mp4" />
            </video>
            <CustomCoinInput
                isError={isError}
                selectedCoin={selectedCoin}
                value={valueToInvest}
                onChange={onChange}
            />
            <div className={'invest-steps--balance'}>
                <div className={'row-with-image--content'}>
                    <img
                        src={selectedCoin?.image}
                        alt={selectedCoin?.name}
                        width={40}
                        height={40}
                    />
                    <div>
                        <p>Selected balance</p>
                        <h3>{selectedCoin?.balance.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InvestStep2;
