import { SerchIcon } from '@/components/Icons/Icons';
import { useRef, useState } from 'react';
import css from './serch-input.module.css';
import cn from 'classnames';

export interface SerchInputProps {
    placeholder: string;
    theme?: string;
}

export const SerchInput = ({ placeholder, theme }: SerchInputProps) => {
    const inputRef = useRef(null);
    const [t, setT] = useState('');

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        e.preventDefault();
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
                inputMode={'text'}
                ref={inputRef}
                value={t}
                onChange={(e) => setT(e.target.value)}
            />
        </div>
    );
};
