import './Icons.scss';
import Home from '../../assets/icons/home-2.svg?react';
import HomeActive from '../../assets/icons/home-2-active.svg?react';
import About from '../../assets/icons/status-up.svg?react';
import Down from '../../assets/icons/narrow-down-right.svg?react';
import Up from '../../assets/icons/narrow-up-right.svg?react';
import Chevron from '../../assets/icons/chevron-down.svg?react';
import Right from '../../assets/icons/arrow-narrow-right.svg?react';
import Load from '../../assets/icons/loading.svg?react';
import LoadingLight from '@/assets/icons/loading-light.svg?react';
import Success from '../../assets/icons/success.svg?react';
import SuccessWhiteSolid from '@/assets/icons/success-white-solid.svg?react';
import WhatToBuy from '../../assets/icons/what-to-buy.svg?react';
import WhatToBuyActive from '../../assets/icons/what-to-buy-active.svg?react';
import Alert from '../../assets/icons/alert.svg?react';
import PnlArrowUp from '../../assets/icons/pnl-arrow-up.svg?react';
import DepositDeposit from '../../assets/icons/deposit-deposit.svg?react';
import DepositSwap from '../../assets/icons/depoit-swap.svg?react';
import DepositAnalitics from '../../assets/icons/deposit-analitics.svg?react';
import DepositFeatured from '../../assets/icons/deposit-featured.svg?react';
import Serch from '../../assets/icons/serch.svg?react';
import Buy from '../../assets/icons/transactions/buy.svg?react';
import Deposit from '../../assets/icons/transactions/deposit.svg?react';
import TransaactionError from '../../assets/icons/transactions/error.svg?react';
import MultiSwap from '../../assets/icons/transactions/multi-svap.svg?react';
import Processing from '../../assets/icons/transactions/processing.svg?react';
import Swap from '../../assets/icons/transactions/swap.svg?react';
import Withdraw from '../../assets/icons/transactions/withdraw.svg?react';
import Profile from '../../assets/icons/profile.svg?react';
import ChevronRight from '@/assets/icons/chevron-right.svg?react';
import Copy from '../../assets/icons/copy.svg?react';
import CopyDone from '@/assets/icons/copy-done.svg?react';
import Attention from '@/assets/icons/attention.svg?react';
import Plus from '@/assets/icons/plus.svg?react';
import Minus from '@/assets/icons/minus.svg?react';

import { TTransactionStatus } from '@/pages/whalet/components/transaction/types';

export const HomeIcon = ({
    className = '',
    isActive = false,
}: {
    className?: string;
    isActive: boolean;
}) =>
    isActive ? (
        <HomeActive className={className} />
    ) : (
        <Home className={className} />
    );

export const AboutIcon = ({ className = '' }: { className?: string }) => (
    <About width={20} height={20} className={className} />
);

export const ChevronRightIcon = ({
    className = '',
    size = 20,
}: {
    className?: string;
    size?: number;
}) => <ChevronRight className={className} width={size} height={size} />;

export const CopyIcon = ({ className = '' }: { className?: string }) => (
    <Copy className={className} />
);

export const CopyDoneIcon = ({ className = '' }: { className?: string }) => (
    <CopyDone className={className} />
);

export const DownIcon = ({ className = '' }: { className?: string }) => (
    <Down className={className} />
);

export const UpIcon = ({ className = '' }: { className?: string }) => (
    <Up className={className} />
);

export const ChevronDown = ({ className = '' }: { className?: string }) => (
    <Chevron className={className} />
);
export const RightIcon = ({ className = '' }: { className?: string }) => (
    <Right className={className} />
);

export const SpinIcon = ({
    className = '',
    type = '',
}: {
    className?: string;
    type?: string;
}) => {
    const isTypeLight = type && type === 'light';
    return (
        <>
            {isTypeLight ? (
                <LoadingLight className={className} />
            ) : (
                <Load className={className} />
            )}
        </>
    );
};
export const SuccessIcon = ({ className = '' }: { className?: string }) => (
    <Success className={className} />
);

export const SuccessWhiteSolidIcon = ({
    className = '',
}: {
    className?: string;
}) => <SuccessWhiteSolid className={className} />;

export const WhatToBuyIcon = ({
    className = '',
    isActive = false,
}: {
    className?: string;
    isActive: boolean;
}) => (isActive ? <WhatToBuyActive /> : <WhatToBuy className={className} />);

export const ProfileIcon = ({ className = '' }: { className?: string }) => (
    <Profile className={className} />
);

export const AlertIcon = ({ className = '' }: { className?: string }) => (
    <Alert className={className} />
);

export const PnlArrowUpIcon = ({ className = '' }: { className?: string }) => (
    <PnlArrowUp className={className} />
);

export const DepositDepositIcon = ({
    className = '',
}: {
    className?: string;
}) => <DepositDeposit className={className} />;

export const DepositSwapIcon = ({ className = '' }: { className?: string }) => (
    <DepositSwap className={className} />
);

export const DepositAnaliticsIcon = ({
    className = '',
}: {
    className?: string;
}) => <DepositAnalitics className={className} />;

export const DepositFeaturedIcon = ({
    className = '',
}: {
    className?: string;
}) => <DepositFeatured className={className} />;

export const SerchIcon = ({ className = '' }: { className?: string }) => (
    <Serch className={className} />
);

export const TransactionStatusIcon = ({
    status,
    className = '',
}: {
    className?: string;
    status: TTransactionStatus;
}) => {
    switch (status) {
        case 'BUY':
            return <Buy className={className} />;
        case 'DEPOSIT':
            return <Deposit className={className} />;
        case 'WITHDRAW':
            return <Withdraw className={className} />;
        case 'SWAP':
            return <Swap className={className} />;
        case 'MULTI-SWAP':
            return <MultiSwap className={className} />;
        case 'SELL':
            return <Buy className={className} />;
        case 'ERROR':
            return <TransaactionError className={className} />;
        case 'PROCESSING':
            return <Processing className={className} />;
    }
};

export const AttentionIcon = ({ className = '' }: { className?: string }) => (
    <Attention className={className} />
);

export const PlusIcon = ({ className = '' }: { className?: string }) => (
    <Plus className={className} />
);

export const MinusIcon = ({ className = '' }: { className?: string }) => (
    <Minus className={className} />
);
