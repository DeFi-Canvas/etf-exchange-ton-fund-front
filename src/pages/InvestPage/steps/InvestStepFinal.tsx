import Loader from '@/components/Loader/Loader.tsx';
import {
    toUserFriendlyAddress,
    useTonConnectUI,
    useTonWallet,
} from '@tonconnect/ui-react';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/hooks/useAppSelector.ts';
import { SuccessIcon } from '@/components/Icons/Icons.tsx';
import ButtonPrimary from '@/components/Buttons/ButtonPrimary.tsx';
import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '@/hooks/useAppDispatch.ts';
import { callContract } from '@/store/reducers/appSlice.ts';

import './InvestSteps.scss';

const InvestStepFinal = () => {
    const navigator = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedCoinToInvest } = useAppSelector((state) => state.appSlice);
    const wallet = useTonWallet();
    const [tonui] = useTonConnectUI();
    const [status, setStatus] = useState<
        'sign' | 'confirm' | 'waiting' | 'error'
    >('sign');

    useEffect(() => {
        if (wallet?.account.address) {
            dispatch(
                callContract({
                    tonui,
                    wallet: toUserFriendlyAddress(wallet.account.address),
                })
            )
                .then(() => {
                    setStatus('confirm');
                })
                .catch(() => setStatus('error'));
        }
    }, [wallet]);

    const renderStatus = () => {
        switch (status) {
            case 'sign':
                return (
                    <>
                        <Loader />
                        <p>Signing the contract</p>
                    </>
                );
            case 'waiting':
                return (
                    <>
                        {' '}
                        <Loader />
                        <p>Signing the contract</p>
                    </>
                );
            case 'confirm':
                return (
                    <>
                        <SuccessIcon />
                        <p>
                            {selectedCoinToInvest} have been invested
                            successfully!
                        </p>
                        <ButtonPrimary
                            text={'View home page'}
                            onClick={() => navigator('/')}
                        />
                    </>
                );
            case 'error':
                return (
                    <>
                        <p>Something went wrong.</p>
                        <ButtonPrimary
                            text={'View home page'}
                            onClick={() => navigator('/')}
                        />
                    </>
                );
            default:
                return <Loader />;
        }
    };

    return (
        <section className={'container contract-call'}>
            {renderStatus()}
        </section>
    );
};

export default InvestStepFinal;
