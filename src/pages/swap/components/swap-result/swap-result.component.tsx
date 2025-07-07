import BottomSheet from '@/components/ui-kit/bottom-sheet/bottom-sheet.component.tsx';
import css from './swap-result.module.css';
import { SwapResultStatus } from '../../swap.model';
import AppButton from '@/components/app-button/app-button.component';
import {
    SuccessIcon,
    ErrorSolidIcon,
    SwapSolidIcon,
} from '@/components/Icons/Icons.tsx';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';

export interface ResultOptions {
    name: string;
    value: string;
}

export interface SwapResultProps {
    isOpen: boolean;
    status: SwapResultStatus;
    subTitle: string;
    logos: Array<string>;
    onClose: () => void;
    resultOptions: ResultOptions[];
}

const swapStatusWrapper = (status: SwapResultStatus) => {
    switch (status) {
        case 'SUCCESS':
            return {
                text: 'Swap in network',
                icon: <SuccessIcon />,
                className: css.colorSuccess,
            };
        case 'ERROR':
            return {
                text: 'Swap failed',
                icon: <ErrorSolidIcon />,
                className: css.colorFailed,
            };
        case 'PROGRESS':
            return {
                text: 'Swap in progress',
                icon: <SwapSolidIcon />,
                className: css.colorProgress,
            };
    }
};

export const SwapResult = ({
    isOpen,
    status,
    subTitle,
    logos,
    onClose,
    resultOptions,
}: SwapResultProps) => {
    const navigate = useNavigate();

    const { className: iconClassName, icon, text } = swapStatusWrapper(status);

    return (
        <div>
            <BottomSheet open={isOpen} onClose={onClose}>
                <div className={css.logoList}>
                    {logos.map((src) => (
                        <img
                            src={src}
                            className={css.logoImage}
                            key={src}
                            alt={'Asset logo'}
                        />
                    ))}
                </div>
                <div className={css.status}>
                    <div className={cn(css.statusIcon, iconClassName)}>
                        {icon}
                    </div>
                    <div className={css.statusText}>{text}</div>
                </div>
                <div className={css.subtitle}>{subTitle}</div>
                <ul className={css.infoList}>
                    {resultOptions.map((info) => (
                        <li key={info.value} className={css.infoItem}>
                            <span className={css.infoItemName}>
                                {info.name}
                            </span>
                            <span className={css.infoItemValue}>
                                {info.value}
                            </span>
                        </li>
                    ))}
                </ul>
                <AppButton
                    label="Close"
                    className={css.buttonClose}
                    onClick={() => {
                        onClose();
                        navigate('/');
                    }}
                />
            </BottomSheet>
        </div>
    );
};
