import { SerchIcon } from '@/components/Icons/Icons';
import { useRef } from 'react';
import css from './serch-input.module.css';
import cn from 'classnames';

export interface SerchInputProps {
    placeholder: string;
    theme?: string;
}

export const SerchInput = ({ placeholder, theme }: SerchInputProps) => {
    const inputRef = useRef(null);

    const handleClick = () => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        inputRef.current.focus();
    };
    return (
        <div className={cn(css.wrap, theme)} onClick={handleClick}>
            <SerchIcon />
            <input
                type="text"
                placeholder={placeholder}
                className={css.input}
                ref={inputRef}
            />
        </div>
    );
};
