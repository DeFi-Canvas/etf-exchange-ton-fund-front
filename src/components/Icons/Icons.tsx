import './Icons.scss';
import Home from '../../assets/icons/home-2.svg?react';
import About from '../../assets/icons/status-up.svg?react';
import Down from '../../assets/icons/narrow-down-right.svg?react';
import Up from '../../assets/icons/narrow-up-right.svg?react';
import Chevron from '../../assets/icons/chevron-down.svg?react';
import Right from '../../assets/icons/arrow-narrow-right.svg?react';
import Load from '../../assets/icons/loading.svg?react';
import Success from '../../assets/icons/success.svg?react';
import WhatToBuy from '../../assets/icons/what-to-buy.svg?react';
import Alert from '../../assets/icons/alert.svg?react';
import PnlArrowUp from '../../assets/icons/pnl-arrow-up.svg?react';
import DepositDeposit from '../../assets/icons/deposit-deposit.svg?react';
import DepositSwap from '../../assets/icons/depoit-swap.svg?react';
import DepositAnalitics from '../../assets/icons/deposit-analitics.svg?react';
import DepositFeatured from '../../assets/icons/deposit-featured.svg?react';

export const HomeIcon = ({ className = '' }: { className?: string }) => (
    <Home width={20} height={20} className={className} />
);

export const AboutIcon = ({ className = '' }: { className?: string }) => (
    <About width={20} height={20} className={className} />
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

export const SpinIcon = ({ className = '' }: { className?: string }) => (
    <Load className={className} />
);
export const SuccessIcon = ({ className = '' }: { className?: string }) => (
    <Success className={className} />
);

export const WhatToBuyIcon = ({ className = '' }: { className?: string }) => (
    <WhatToBuy className={className} />
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
