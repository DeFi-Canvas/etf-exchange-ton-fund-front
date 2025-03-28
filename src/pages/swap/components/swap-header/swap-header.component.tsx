import { Chip } from '@/components/chip/chip.component.tsx';
import { ReloadIcon } from '@/components/Icons/Icons.tsx';
import css from './swap-header.module.css';
import { useState } from 'react';
import cn from 'classnames';

export interface SwapHeaderProps {
    onClick: () => void;
    texts: {
        title: string;
        fee: string;
    };
}

export const SwapHeader = ({ onClick, texts }: SwapHeaderProps) => {
    const [isRotating, setIsRotating] = useState(false);
    const handleClick = () => {
        setIsRotating(true);
        onClick();

        setTimeout(() => {
            setIsRotating(false);
        }, 350);
    };

    return (
        <header className={css.header}>
            <h2 className="h2">{texts.title}</h2>
            <Chip text={`0% ${texts.fee}`} className={css.headerChip} />
            <button
                className={cn(css.headerButton, {
                    [css.rotate]: isRotating,
                })}
                onClick={handleClick}
            >
                <ReloadIcon />
            </button>
        </header>
    );
};
